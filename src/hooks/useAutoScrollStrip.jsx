import { useEffect, useRef } from "react";

export default function useAutoScrollStrip(enabled, itemCount = 0) {
    const stripRef = useRef(null);

    useEffect(() => {
        if (!enabled || itemCount < 2 || !stripRef.current) {
            return undefined;
        }

        const node = stripRef.current;
        let resumeTimeout;
        let intervalId;

        const getStepWidth = () => {
            const firstItem = node.firstElementChild;
            if (!firstItem) return node.clientWidth * 0.8;

            const styles = window.getComputedStyle(node);
            const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;

            return firstItem.getBoundingClientRect().width + gap;
        };

        const tick = () => {
            if (!node) return;

            const maxScroll = node.scrollWidth - node.clientWidth;
            if (maxScroll <= 16) return;

            const stepWidth = getStepWidth();
            const nextScroll = node.scrollLeft + stepWidth;

            node.scrollTo({
                left: nextScroll >= maxScroll - 6 ? 0 : nextScroll,
                behavior: "smooth",
            });
        };

        const start = () => {
            window.clearInterval(intervalId);
            intervalId = window.setInterval(tick, 3200);
        };

        const pauseAutoScroll = () => {
            window.clearInterval(intervalId);
            window.clearTimeout(resumeTimeout);
        };

        const resumeAutoScroll = () => {
            window.clearTimeout(resumeTimeout);
            resumeTimeout = window.setTimeout(() => {
                start();
            }, 1800);
        };

        start();
        node.addEventListener("pointerdown", pauseAutoScroll);
        node.addEventListener("touchstart", pauseAutoScroll, { passive: true });
        node.addEventListener("pointerup", resumeAutoScroll);
        node.addEventListener("touchend", resumeAutoScroll);

        return () => {
            window.clearInterval(intervalId);
            window.clearTimeout(resumeTimeout);
            node.removeEventListener("pointerdown", pauseAutoScroll);
            node.removeEventListener("touchstart", pauseAutoScroll);
            node.removeEventListener("pointerup", resumeAutoScroll);
            node.removeEventListener("touchend", resumeAutoScroll);
        };
    }, [enabled, itemCount]);

    return stripRef;
}
