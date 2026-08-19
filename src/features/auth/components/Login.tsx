import BodyLayout from "../../shared/components/layout/BodyLayout";

interface LoginProps {
    error?: string;
}

export default function Login(props: LoginProps) {
    const { error } = props;
    return (
        <BodyLayout title="Note to self...">
            <div class="login-container">
                <div class="login-card">
                    <form method="post" action="/auth/login" x-data="{ pin: '' }">
                        <label for="pinInput" class="form-label">Enter PIN:</label>
                        <input type="password" id="pinInput" name="Pin" x-model="pin"
                               class="form-control pin-input" required />
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