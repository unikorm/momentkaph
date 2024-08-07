import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
    public transporter;

    constructor(private readonly nodemailer: nodemailer) {
        this.transporter = this.nodemailer.crea
    }
}
