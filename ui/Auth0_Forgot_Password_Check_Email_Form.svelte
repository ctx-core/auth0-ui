<script>
import Auth0_Dialog_Close from './Auth0_Dialog_Close.svelte'
let root
</script>

<div bind:this="{root}" class="form forgot_password_check_email">
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	<h1>Check Your Email</h1>
	<p>An email to reset you password has been sent to you.</p>
</div>
