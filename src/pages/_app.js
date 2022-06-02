import "../styles/globals.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ margin: 10, border: "2px solid purple" }}>
      <Component {...pageProps} />

      <Script
        id="imber"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `alert('hi')`,
        }}
      />
    </div>
  );
}

export default MyApp;
