export function Logo({ size = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 768 768"
      height={size}
      fill="white"
    >
      <polygon points="463.7 0 393.7 142 233.3 142 303.3 0 192 0 0 384 112.3 384 183.3 242 343.7 242 272.7 384 384 384 576 0 463.7 0"/>
      <path d="M625.8,668.5l142.2-284.5h-384l-50,100h112.2l-176.6,128.7-77.6,155.3h322.5v.5h254v-100h-142.8ZM514.2,668h-160.4l252.4-184-92,184Z"/>
    </svg>
  );
}
