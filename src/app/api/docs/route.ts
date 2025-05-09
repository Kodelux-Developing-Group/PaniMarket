import { NextResponse } from 'next/server';
import swaggerSpecs from '../../../../swaggerConfig';
export const config = {
    api: {
        bodyParser: false, // Necesario para usar middlewares de Express
    },
};

// Solo soporta GET para devolver el JSON de OpenAPI
export async function GET() {
    return NextResponse.json(swaggerSpecs);
}