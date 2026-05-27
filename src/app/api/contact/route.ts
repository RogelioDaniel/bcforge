import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface ContactFormData {
  name: string
  company?: string
  email: string
  phone?: string
  interests?: string[]
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    const submission = await db.contactSubmission.create({
      data: {
        name: body.name,
        company: body.company || null,
        email: body.email,
        phone: body.phone || null,
        interests: body.interests ? JSON.stringify(body.interests) : null,
        message: body.message || null,
        status: 'new',
      },
    })

    // Send notification
    try {
      await sendNotification(body)
    } catch (notifyError) {
      console.error('Notification failed:', notifyError)
    }

    return NextResponse.json({
      success: true,
      id: submission.id,
      message: 'Solicitud recibida correctamente',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('Failed to fetch submissions:', error)
    return NextResponse.json(
      { error: 'Error fetching submissions' },
      { status: 500 }
    )
  }
}

async function sendNotification(data: ContactFormData) {
  const NOTIFICATION_EMAIL = 'rogelio-daniel@hotmail.es'
  const NOTIFICATION_PHONE = '5617075485'

  const interestsList = data.interests?.length 
    ? data.interests.map(i => `<li>${i}</li>`).join('') 
    : '<li>No especificados</li>'

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 8px;">
      <div style="background: linear-gradient(135deg, #1a3a6e, #4f8fff); padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Evaluation Request - BCForge</h1>
      </div>
      <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
        <h2 style="color: #111827; margin-top: 0;">Datos del contacto</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Nombre</td><td style="padding: 8px; border-bottom: 1px solid #f3f4f6; color: #6b7280;">${data.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Empresa</td><td style="padding: 8px; border-bottom: 1px solid #f3f4f6; color: #6b7280;">${data.company || 'No especificada'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Email</td><td style="padding: 8px; border-bottom: 1px solid #f3f4f6; color: #6b7280;">${data.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Teléfono</td><td style="padding: 8px; border-bottom: 1px solid #f3f4f6; color: #6b7280;">${data.phone || 'No proporcionado'}</td></tr>
        </table>
        <h3 style="color: #111827; margin-top: 20px;">Intereses</h3>
        <ul style="color: #6b7280; padding-left: 20px;">${interestsList}</ul>
        ${data.message ? `<h3 style="color: #111827; margin-top: 20px;">Mensaje</h3><p style="color: #6b7280; background: #f9fafb; padding: 12px; border-radius: 6px;">${data.message}</p>` : ''}
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">Recibido: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}</p>
      </div>
    </div>
  `

  const textBody = `NUEVA SOLICITUD BCForge\nNombre: ${data.name}\nEmpresa: ${data.company || 'No especificada'}\nEmail: ${data.email}\nTeléfono: ${data.phone || 'No proporcionado'}\nIntereses: ${data.interests?.join(', ') || 'No especificados'}\nMensaje: ${data.message || 'Sin mensaje'}`

  console.log('📧 Notification for:', NOTIFICATION_EMAIL, '| 📱 SMS:', NOTIFICATION_PHONE)
  console.log(textBody)

  // Send email via nodemailer
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS

  if (emailUser && emailPass) {
    try {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.default.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: { user: emailUser, pass: emailPass },
      })

      await transporter.sendMail({
        from: `"BCForge Contacto" <${emailUser}>`,
        to: NOTIFICATION_EMAIL,
        subject: `Nueva solicitud BCForge - ${data.name}`,
        html: htmlBody,
        text: textBody,
      })

      console.log('✅ Email sent successfully to', NOTIFICATION_EMAIL)
    } catch (emailError) {
      console.error('❌ Failed to send email:', emailError)
    }
  } else {
    console.log('⚠️ EMAIL_USER/EMAIL_PASS not set - email notification skipped')
    console.log('💡 To enable email notifications, set these environment variables:')
    console.log('   EMAIL_USER=your-outlook-email@hotmail.com')
    console.log('   EMAIL_PASS=your-app-password')
  }

  // SMS notification via webhook if configured
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: NOTIFICATION_EMAIL,
          phone: NOTIFICATION_PHONE,
          subject: `Nueva solicitud BCForge - ${data.name}`,
          content: textBody,
          formData: data,
        }),
      })
      console.log('✅ Webhook notification sent')
    } catch (webhookError) {
      console.error('❌ Webhook notification failed:', webhookError)
    }
  }
}
