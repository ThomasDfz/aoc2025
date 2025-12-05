Object.defineProperties(Array.prototype, {
    none: {
        value(f) {
            return !this.some(f);
        },
    },
    sum: {
        value(f) {
            return this.reduce((acc, curr, i) => acc + (f ? Number(f(curr, i)) : Number(curr)), 0);
        }
    },
    middle: {
        get() {
            return this[Math.floor(this.length / 2)];
        },
    },
    allEqual: {
        value() {
            return this.every(el => el === this[0]);
        }
    }
});

Object.defineProperties(Map.prototype, {
    append: {
        value(k, v) {
            this.has(k) ? this.get(k).push(v) : this.set(k, [v]);

            return this;
        }
    },
    increment: {
        value(k) {
            this.has(k) ? this.set(k, this.get(k) + 1) : this.set(k, 1);

            return this;
        }
    },
});

Object.defineProperties(String.prototype, {
    reverse: {
        value() {
            return this.split('').reverse().join('');
        }
    },
    chunk: {
        value(n) {
            return this.match(new RegExp('.{1,' + n + '}', 'g'))
        }
    }
});
