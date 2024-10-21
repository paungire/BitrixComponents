import "./Otp.css";
export const Otp = {
	props: ["count", "open", "error"],
	name: "Otp",
	data() {
		return {
			code: "",
			currentNumber: 1,
		};
	},
	mounted() {
		if (!this.count) {
			this.count = 4;
		}
	},
	methods: {
		selectDigit(n) {
			this.$refs.otpInput.selectionStart = n - 1;
			this.$refs.otpInput.selectionEnd = n;
			this.currentNumber = this.$refs.otpInput.selectionStart + 1;
		},

		setSelected(e) {
			this.$emit("input", e);

			if (e.code == "Space") {
				e.preventDefault();
				e.stopPropagation();
			}
			if (e.key == "ArrowLeft") {
				this.$refs.otpInput.setSelectionRange(
					this.$refs.otpInput.selectionStart - 1,
					this.$refs.otpInput.selectionStart,
					"forward"
				);
				this.currentNumber = this.$refs.otpInput.selectionStart + 1;
			} else if (e.key == "ArrowRight") {
				this.$refs.otpInput.setSelectionRange(
					this.$refs.otpInput.selectionStart,
					this.$refs.otpInput.selectionStart + 1,
					"forward"
				);
				this.currentNumber = this.$refs.otpInput.selectionStart + 2;
			} else if (e.key == "Backspace") {
				e.preventDefault();
				let start = this.$refs.otpInput.selectionStart;
				this.code = this.code.slice(0, start) + this.code.slice(start + 1);

				setTimeout(() => {
					this.$refs.otpInput.setSelectionRange(start - 1, start, "forward");
				}, 0);
				this.currentNumber =
					this.$refs.otpInput.selectionStart > 0
						? this.$refs.otpInput.selectionStart
						: 1;
			} else if (!isNaN(+e.key) && e.key != " ") {
				this.$refs.otpInput.setSelectionRange(
					this.$refs.otpInput.selectionStart,
					this.$refs.otpInput.selectionStart + 1,
					"forward"
				);
			} else {
				// console.log(e);
			}
		},

		changeCode(e) {
			this.code = e.currentTarget.value;
			this.currentNumber = this.$refs.otpInput.selectionStart + 1;
			if (this.code.length == this.count) {
				this.$emit("complete", this.code);
			}
		},
	},

	watch: {
		open(val) {
			if (val) this.$refs.otpInput.focus();
		},
	},
	/*html*/
	template: `
  <div class="otp" :class="{open:open, error:error}">
    <input type="text" ref="otpInput" autocomplete="one-time-code" :maxlength="count" inputmode="numeric" @input="changeCode" :value="code" @keydown="setSelected">
    <div class="digits" @click="$refs.otpInput.focus()">
      <span @click="selectDigit(n)" v-for="n in count" ref="digit" :class="{'current':n == currentNumber,'field':code[n-1]}">{{code[n-1]}}</span>
    </div>
  </div>
  `,
};
