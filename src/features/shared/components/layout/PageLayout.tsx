import Icon from "../Icon";
import UtilityModal from "../UtilityModal";
import Working from "../Working";
import BodyLayout from "./BodyLayout";
import ChatModal from "../../../chat/components/ChatModal";

function PageLayout(props: any){
    return (
        <BodyLayout>
            <main>
                <nav>
                    <a href="/" class="btn-link"><h3>Note To Self</h3></a>
                    <span class="controls">
                        <Working Id="mainLayout_spinner"/>
                        <button type="button" class="btn btn-warning" command="show-modal" commandfor="chatModal">
                            <Icon name="message-circle" filled={false} />
                        </button>
                        <button type="button" class="btn btn-warning" command="show-modal" commandfor="utilityModal" hx-get="/notes/edit/00000000-0000-0000-0000-000000000000" hx-target="#utilityModal_content">
                            <Icon name="plus" />
                        </button>
                    </span>
                </nav>

                {props.children}

                <UtilityModal/>
                <ChatModal/>
            </main>

            <form method="post" action="/auth/logout" id="logout-form">
                <button type="submit" class="btn btn-link">Logout</button>
            </form>

        </BodyLayout>
    )
}

export default PageLayout;