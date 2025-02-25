import { NearContract, NearBindgen, near, call, view } from 'near-sdk-js'
import { isUndefined } from 'lodash-es'
import { log } from './log'

@NearBindgen
class Counter extends NearContract {
    count: number;

    constructor({ initial = 0 }: { initial: number }) {
        super()
        this.count = initial
    }

    @call
    increase({ n = 1 }: { n: number }) {
        this.count += n
        near.log(`Counter increased to ${this.count}`)
    }

    @call
    decrease({ n }: { n: number }) {
        // you can use default argument `n=1` too
        // this is to illustrate a npm dependency: lodash can be used
        if (isUndefined(n)) {
            this.count -= 1
        } else {
            this.count -= n
        }
        // this is to illustrate import a local ts module
        log(`Counter decreased to ${this.count}`)
    }

    @view
    getCount(): number {
        return this.count
    }

    default() {
        return new Counter({ initial: 0 })
    }
}

