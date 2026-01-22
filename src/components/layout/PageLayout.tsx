import Icon from "../shared/Icon";
import UtilityModal from "../shared/UtilityModal";
import Working from "../shared/Working";
import BodyLayout from "./BodyLayout";

function PageLayout(props: any){
    return (
        <BodyLayout>
            <div class="page">
                <main>
                    <div class="top-row px-4 d-flex justify-content-between">
                        <h3 class="mt-1 mb-1">Note to self...</h3>
                        <span class="d-flex align-items-center gap-2">
                            <Working Id="mainLayout_spinner"/>
                            <button type="button" class="btn btn-light p-1" command="show-modal" commandfor="utilityModal" hx-get="/editnote/00000000-0000-0000-0000-000000000000" hx-target="#utilityModal_content">
                                <Icon name="plus" />
                            </button>
                        </span>                
                    </div>

                    <article class="content px-4">
                        {props.children}
                    </article>
                </main>

                <UtilityModal/>

            </div>
            <form method="post" action="/auth/logout" class="d-flex w-100 my-3 justify-content-center">
                <button type="submit" class="btn btn-warning">Logout</button>
            </form>
        </BodyLayout>
    )
}

export default PageLayout;