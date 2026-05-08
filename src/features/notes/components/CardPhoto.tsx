import type { Child } from 'hono/jsx';

interface CardPhotoProps {
    storageUrl?: string | null;
    children?: Child;
}

export default function CardPhoto(props: CardPhotoProps) {
    const { storageUrl, children } = props;
    const bgImage = storageUrl?.trim() ? storageUrl : '/static/img/missing.jpg';
    return (
        <div class="shadow-sm note-image-wrapper card-image" style={`background-image: url(${bgImage});`}>
            {children}
        </div>
    )
}
