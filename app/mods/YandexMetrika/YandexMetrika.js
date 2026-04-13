'use client'

import { useEffect } from 'react';

export default function YandexMetrikaWithB242YA({ counter }) {
    useEffect(() => {
        if (!counter) return;

        // === 1. Загрузка Яндекс Метрики ===
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

            window.ym(Number(counter), 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            });
        }

        // === 2. waitForYm ===
        function waitForYm(ymCounterNum, callback, interval = 250) {
            if (!callback) return;

            if (!ymCounterNum) {
                const metrikaObj =
                    (window.Ya && (window.Ya.Metrika || window.Ya.Metrika2)) || null;

                ymCounterNum =
                    (metrikaObj &&
                        metrikaObj.counters &&
                        (metrikaObj.counters() || [0])[0]?.id) ||
                    0;
            }

            const ymCounterObj = window['yaCounter' + ymCounterNum] || null;

            if (ymCounterObj) {
                callback(ymCounterObj, ymCounterNum);
                return;
            }

            setTimeout(() => waitForYm(ymCounterNum, callback, interval), interval);
        }

        // === 3. B242YA ===
        waitForYm(null, function () {
            if (document.getElementById('b242ya-script')) return;

            const s = document.createElement('script');
            s.id = 'b242ya-script';
            s.async = false;
            s.defer = false;
            s.src = 'https://67p.b242ya.ru/static/js/b242ya.js?' + ((Date.now() / 60000) | 0);

            const h = document.getElementsByTagName('script')[0];
            h.parentNode.insertBefore(s, h);

            s.addEventListener('load', function () {
                if (!window.B242YAInit) return;

                window.B242YAInit({
                    portal: 'https://speedinet.bitrix24.ru/',
                    pid: '67db87632afc073c21577677406d3dc7',
                    presets: {
                        YA_COUNTER: String(counter)
                    }
                });
            });
        });

        // === 4. Cookie с counter ID ===
        waitForYm(null, function () {
            try {
                const id = window.Ya?._metrika?.getCounters?.()[0]?.id;
                if (id) {
                    document.cookie = `y_counter_id=${id}; path=/; SameSite=Lax`;
                }
            } catch (e) {
                console.warn('YM cookie error', e);
            }
        });

    }, [counter]);

    return null;
}
