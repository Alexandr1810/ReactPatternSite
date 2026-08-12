// components/PixelVictory.jsx
import Script from 'next/script'

export default function PixelVictory() {
  return (
    <Script
      id="pixel-victory"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function (d, w) {
            var n = d.getElementsByTagName("script")[0],
              s = d.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://victorycorp.ru/index.php?ref="+d.referrer+"&page=" +
              encodeURIComponent(w.location.href);
            n.parentNode.insertBefore(s, n);
          })(document, window);
        `,
      }}
    />
  )
}