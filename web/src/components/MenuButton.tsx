export default function MenuButton() {
  return (
    <button
      id="hamburger-menu"
      aria-label="Menu"
      data-topnav-menu-label-open="Menu"
      data-topnav-menu-label-close="Close"
      data-topnav-flyout-trigger-compact="menu"
      className="md:hidden"
    >
      <svg width="24" height="24" viewBox="0 0 18 18">
        <polyline
          id="bread-bottom"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          points="2 12, 16 12"
          className=""
        >
          <animate
            id="bread-bottom-open"
            attributeName="points"
            keyTimes="0;0.5;1"
            dur="0.2s"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
            values=" 2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5"
          ></animate>
          <animate
            id="bread-bottom-close"
            attributeName="points"
            keyTimes="0;0.5;1"
            dur="0.2s"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
            values=" 3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12"
          ></animate>
        </polyline>
        <polyline
          id="bread-top"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          points="2 5, 16 5"
          className=""
        >
          <animate
            id="bread-top-open"
            attributeName="points"
            keyTimes="0;0.5;1"
            dur="0.2s"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
            values=" 2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15"
          ></animate>
          <animate
            id="bread-top-close"
            attributeName="points"
            keyTimes="0;0.5;1"
            dur="0.2s"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
            values=" 3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5"
          ></animate>
        </polyline>
      </svg>
    </button>
  );
}
