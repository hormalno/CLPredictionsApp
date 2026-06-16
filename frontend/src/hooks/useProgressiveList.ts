import { useCallback, useEffect, useRef, useState } from 'react';

type Options = {
    /** How many items to show initially and to add each time the sentinel is reached. */
    batchSize?: number;
};

/**
 * Renders a long list incrementally instead of all at once. Returns the slice of
 * items to render plus a `sentinelRef` to place at the bottom of the list — when
 * it scrolls into view, the next batch is revealed. No network calls: the full
 * `items` array is expected to already be loaded.
 */
export function useProgressiveList<T>(items: T[], { batchSize = 6 }: Options = {}) {
    const [visibleCount, setVisibleCount] = useState(batchSize);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // Reset when the underlying list changes (e.g. data finished loading).
    useEffect(() => {
        setVisibleCount(batchSize);
    }, [items, batchSize]);

    const hasMore = visibleCount < items.length;

    const showMore = useCallback(() => {
        setVisibleCount(count => Math.min(count + batchSize, items.length));
    }, [batchSize, items.length]);

    useEffect(() => {
        const node = sentinelRef.current;
        if (!node || !hasMore) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) showMore();
            },
            { rootMargin: '200px' }, // start loading slightly before it's visible
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [hasMore, showMore]);

    return { visibleItems: items.slice(0, visibleCount), sentinelRef, hasMore };
}
