declare module 'qrcode' {
  export interface QRCodeOptions {
    type?: string;
    width?: number;
    margin?: number;
    scale?: number;
    errorCorrectionLevel?: 'low' | 'medium' | 'quartile' | 'high' | 'L' | 'M' | 'Q' | 'H';
    color?: {
      dark?: string;
      light?: string;
    };
  }

  export function toDataURL(text: string | Buffer, options?: QRCodeOptions): Promise<string>;
  export function toString(text: string | Buffer, options?: QRCodeOptions): Promise<string>;
  export function toCanvas(canvas: HTMLCanvasElement, text: string | Buffer, options?: QRCodeOptions): Promise<void>;
}
