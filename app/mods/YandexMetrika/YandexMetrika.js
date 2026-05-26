'use client'

import { useEffect } from 'react';

export default function YandexMetrikaWithB242YA({ counter }) {
    useEffect(() => {
        if (!counter) return;

        // === 1. Загружаем Яндекс Метрику ===
        if (!window.ym) {
            (function (m, e, t, r, i) {
                m[i] = m[i] || function () {
                    (m[i].a = m[i].a || []).push(arguments);
                };
                m[i].l = 1 * new Date();
                const k = e.createElement(t);
                const a = e.getElementsByTagName(t)[0];
                k.async = true;
                k.src = r;
                a.parentNode.insertBefore(k, a);
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
        }

        // Инициализируем счётчик (ym — очередь, вызов безопасен до загрузки скрипта)
        window.ym(Number(counter), 'init', {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
        });

        // === 2. Cookie с counter ID ===
        // ym() — это очередь, колбэк выполнится когда метрика загрузится
        window.ym(Number(counter), 'getClientID', function (clientID) {
            try {
                document.cookie = `y_counter_id=${counter}; path=/; SameSite=Lax`;
                if (clientID) {
                    document.cookie = `ym_client_id=${clientID}; path=/; SameSite=Lax`;
                }
            } catch (e) {
                console.warn('YM cookie error', e);
            }
        });

        // === 3. Загружаем B242YA ===
        // НЕ нужно ждать загрузки ym-объекта — b242ya.js сам найдёт метрику
        // counter передаём через presets, этого достаточно
        if (document.getElementById('b242ya-script')) return;

        const s = document.createElement('script');
        s.id = 'b242ya-script';
        s.async = false;
        s.defer = false;
        s.src = 'https://67p.b242ya.ru/static/js/b242ya.js?' + ((Date.now() / 60000) | 0);

        // Вставляем в <head> или в конец <body> — не перед первым скриптом Next.js
        (document.head || document.body).appendChild(s);

        s.addEventListener('load', function () {
            if (typeof window.B242YAInit !== 'function') {
                console.warn('B242YAInit не найден после загрузки скрипта');
                return;
            }

            window.B242YAInit({
                portal: 'https://speedinet.bitrix24.ru/',
                pid: '67db87632afc073c21577677406d3dc7',
                presets: {
                    YA_COUNTER: String(counter),
                },
            });
        });

    }, [counter]);

    return null;
}