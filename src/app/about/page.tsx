export default function AboutPage() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '2rem',
            }}
        >
            <h1>About Us</h1>
            <p>This is a simple Next.js application demonstrating various features.</p>
            <p>Feel free to explore the code and learn more!</p>
        </div>
    );
}
//This is will be generated at build time and then served as static HTML -SSG