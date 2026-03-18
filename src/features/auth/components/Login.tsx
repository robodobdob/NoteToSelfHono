import BodyLayout from "../../shared/components/layout/BodyLayout";

interface LoginProps {
    error?: string;
}

function Login(props: LoginProps) {
    const { error } = props;
    return (
        <BodyLayout title="Note to self...">
            <div class="login-container">
                <div class="login-card">
                    <form method="post" action="/auth/login" x-data="{ pin: '' }">
                        <label for="pinInput" class="form-label">Enter PIN:</label>
                        <input type="password" id="pinInput" name="Pin" x-model="pin"
                               class="form-control pin-input" required />
                        <div class="keypad" x-on:click="if ($event.target.type === 'button') pin += $event.target.innerText">
                            <button type="button" class="btn btn-secondary">7</button>
                            <button type="button" class="btn btn-secondary">8</button>
                            <button type="button" class="btn btn-secondary">9</button>
                            <button type="button" class="btn btn-secondary">4</button>
                            <button type="button" class="btn btn-secondary">5</button>
                            <button type="button" class="btn btn-secondary">6</button>
                            <button type="button" class="btn btn-secondary">1</button>
                            <button type="button" class="btn btn-secondary">2</button>
                            <button type="button" class="btn btn-secondary">3</button>
                            <button type="reset" class="btn btn-danger" x-on:click="pin = ''">X</button>
                            <button type="button" class="btn btn-secondary">0</button>
                            <button type="submit" class="btn btn-success">&gt;</button>
                        </div>
                        {error && (
                            <div id="errorMessage">
                                <div class="alert alert-danger error-message" role="alert">{error}</div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </BodyLayout>
    )
}

export default Login;
