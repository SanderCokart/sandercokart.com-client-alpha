import {MutableRefObject, RefObject, ForwardedRef} from 'react';


type Refs<A> = MutableRefObject<A>/* | RefObject<A> | ForwardedRef<A>*/;
type RefValues = HTMLElement | null;

export default function syncScroll<A extends RefValues, B extends RefValues | null>(sync: Refs<A>, syncWith: Refs<B>) {

    if (sync.current && syncWith.current) {
        const elements = Array.from(document.querySelectorAll(':hover'));
        const hovering = elements.includes(sync.current);

        if (hovering) {
            //total height
            const textareaHeight = syncWith.current.scrollHeight;
            const previewHeight = sync.current.scrollHeight;

            //amount actually scrolled
            const previewScrolled = sync.current.scrollTop;

            //inner height
            const textareaInnerHeight = syncWith.current.clientHeight;
            const previewInnerHeight = sync.current.clientHeight;

            //available scroll hight on both
            const textareaScrollArea = textareaHeight - textareaInnerHeight;
            const previewScrollArea = previewHeight - previewInnerHeight;

            //amount scrolled converted from preview to textarea
            const percentageScrolledOnPreview = (100 / previewScrollArea) * previewScrolled;
            const result = (textareaScrollArea / 100) * percentageScrolledOnPreview;

            syncWith.current.scrollTop = result;
        }
    }
};
