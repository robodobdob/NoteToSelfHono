import BodyLayout from "../../shared/components/layout/BodyLayout";

interface LoginProps {
    error?: string;
}

export default function Login(props: LoginProps) {
    const { error } = props;
    return (
        <BodyLayout title="Note to self...">
            <div id="login-container">
                <div id="login-card">
                    <form method="post" action="/auth/login">
                        <label for="pinInput" class="form-label">PIN CODE</label>
                        <input type="number" pattern="[0-9]*" inputmode="numeric" id="pinInput" name="Pin" class="form-control" required/>
                        <button class="btn btn-light" type="submit">Login</button>
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