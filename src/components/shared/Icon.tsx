interface IconProps {
  name: string;
  filled?: boolean;
  size?: number;
}

function Icon(props: IconProps) {
    const { name = "circle", filled = false, size = 24 } = props;
    return (
        <svg
            width={size}
            height={size}
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

export default Icon;