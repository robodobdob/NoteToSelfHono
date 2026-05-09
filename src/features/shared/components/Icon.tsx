interface IconProps {
  name: string;
  filled?: boolean;
  size?: number;
}

export default function Icon(props: IconProps) {
    const { name = "circle", filled = false, size = 24 } = props;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            >
            <use href={`/static/img/feather-sprite.svg#${name}`} />
        </svg>
    )
}