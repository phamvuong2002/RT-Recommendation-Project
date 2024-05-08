import { useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const FadeInYDirection = (position, duration) => {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start({ y: 0, opacity: 1, transition: { duration } });
        } else {
            if (position === 'top') {
                controls.start({ y: -100, opacity: 0, transition: { duration } });
            }
            else if (position === 'bottom') {
                controls.start({ y: 100, opacity: 0, transition: { duration } });
            }
        }

    }, [position, controls, inView, duration]);


    if (position === 'top') {
        return { ref, animate: controls, initial: { y: -100, opacity: 0 } };
    }
    else if (position === 'bottom') {
        return { ref, animate: controls, initial: { y: 100, opacity: 0 } };
    }
};

export const FadeInXDirection = (position, duration) => {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start({ x: 0, opacity: 1, transition: { duration } });
        }
        else {
            if (position === 'right') {
                controls.start({ x: 100, opacity: 0, transition: { duration } });
            }
            else if (position === 'left') {
                controls.start({ x: -100, opacity: 0, transition: { duration } });
            }
        }
    }, [position, controls, inView, duration]);

    if (position === 'right') {
        return { ref, animate: controls, initial: { x: 100, opacity: 0 } };
    }
    else if (position === 'left') {
        return { ref, animate: controls, initial: { x: -100, opacity: 0 } };
    }
};