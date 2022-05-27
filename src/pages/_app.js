import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ margin: 10, border: "2px solid purple" }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
