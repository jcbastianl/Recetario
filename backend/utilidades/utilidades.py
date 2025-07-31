#email
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv
from smtplib import SMTPResponseException

def sendMail(html, asunto, para):
    msg = MIMEMultipart('alternative')
    msg['From'] = os.getenv('SMTP_USER')
    msg['To'] = para
    msg['Subject'] = asunto

    msg.attach(MIMEText(html, 'html'))

    try:
        server = smtplib.SMTP(os.getenv('SMTP_SERVER'), (os.getenv('SMTP_PORT')))
        server.login(os.getenv('SMTP_USER'), os.getenv('SMTP_PASSWORD'))
        server.sendmail(os.getenv('SMTP_USER'), para, msg.as_string())
        server.quit()
        
    except SMTPResponseException as e:
        print("Error al enviar el correo: " + str(e))