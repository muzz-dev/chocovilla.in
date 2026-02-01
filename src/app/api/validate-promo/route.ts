import { NextRequest, NextResponse } from 'next/server';
import { validatePromoCode } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const { code, cartSubtotal } = await request.json();

    if (!code || typeof cartSubtotal !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    const result = await validatePromoCode(code, cartSubtotal);

    return NextResponse.json({
      success: result.valid,
      promoCode: result.promoCode,
      discount: result.discount,
      error: result.error,
    });
  } catch (error) {
    console.error('API Error validating promo code:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to validate promo code. Please try again.' },
      { status: 500 }
    );
  }
}