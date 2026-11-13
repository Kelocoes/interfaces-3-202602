import { ImageResponse } from 'next/og';

export const alt = 'Rutinas de ejercicio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 80,
                    background: '#5454e9',
                    color: 'white',
                }}
            >
                <div style={{ fontSize: 88, fontWeight: 700 }}>Rutinas de ejercicio</div>
                <div style={{ fontSize: 40, marginTop: 24 }}>Explora ejercicios y arma tus rutinas</div>
            </div>
        ),
        size,
    );
}