
export interface AxiosInterceptorManager<V> {
    use<T = V>(onFulfilled?: (value: V) => T | Promise<T>, onRejected?: (error: any) => any): number;
    eject:(id: number)=>void;
}

export class InterceptorsManager{
    handlers=[] as Array<any>
    constructor() {
         this.handlers=[]
    }
    use(fulfilled:Function,rejected:Function){
        this.handlers.push({
            fulfilled,rejected
        })
        return this.handlers.length - 1;
    }
    eject(id:number){
        if (this.handlers[id]) {
            this.handlers[id] = null;
        }
    }
    forEach(fn:Function){
        this.handlers.forEach(item=>{
            if(item!==null){
                fn(item)
            }
        })
    }
}
