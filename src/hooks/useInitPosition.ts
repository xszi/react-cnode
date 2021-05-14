import { useEffect } from 'react';

function useInitPosition(...args: any): void {
    useEffect(() => {
        window.scrollTo.apply(null, args); 
    }, [args])
}

export default useInitPosition