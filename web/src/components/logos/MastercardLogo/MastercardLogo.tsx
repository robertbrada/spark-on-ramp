import { Box } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

interface LogoProps extends BoxProps {
  size?: number;
  variant?: "color" | "white-text" | "white";
}

export function MastercardLogo({
  size = 50,
  variant = "color",
  ...others
}: LogoProps) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * (594 / 763)}
      viewBox="0 0 763 594"
      xmlSpace="preserve"
      {...others}
    >
      <path
        d="M138.29 591.983V552.657C138.29 537.614 129.126 527.763 113.396 527.763C105.531 527.763 96.9783 530.359 91.0985 538.912C86.5169 531.734 79.9498 527.763 70.0992 527.763C63.5322 527.763 56.9651 529.748 51.7726 536.926V529.061H38.0276V591.983H51.7726V557.238C51.7726 546.09 57.6524 540.821 66.8157 540.821C75.979 540.821 80.5607 546.701 80.5607 557.238V591.983H94.3057V557.238C94.3057 546.09 100.873 540.821 109.349 540.821C118.512 540.821 123.094 546.701 123.094 557.238V591.983H138.29ZM342.174 529.061H319.876V510.047H306.131V529.061H293.684V541.508H306.131V570.373C306.131 584.805 312.011 593.281 327.742 593.281C333.621 593.281 340.188 591.295 344.77 588.699L340.799 576.863C336.828 579.46 332.247 580.147 328.963 580.147C322.396 580.147 319.8 576.176 319.8 569.685V541.508H342.097V529.061H342.174ZM458.854 527.687C450.988 527.687 445.719 531.657 442.436 536.85V528.985H428.691V591.906H442.436V556.475C442.436 546.013 447.018 540.057 455.57 540.057C458.166 540.057 461.45 540.744 464.122 541.355L468.093 528.221C465.344 527.687 461.45 527.687 458.854 527.687ZM282.536 534.254C275.969 529.672 266.805 527.687 256.955 527.687C241.224 527.687 230.763 535.552 230.763 547.999C230.763 558.46 238.628 564.416 252.373 566.325L258.94 567.013C266.118 568.311 270.089 570.296 270.089 573.58C270.089 578.161 264.82 581.445 255.657 581.445C246.493 581.445 239.239 578.161 234.657 574.878L228.09 585.339C235.268 590.608 245.119 593.205 254.969 593.205C273.296 593.205 283.834 584.652 283.834 572.892C283.834 561.744 275.281 555.864 262.224 553.879L255.657 553.191C249.777 552.504 245.195 551.206 245.195 547.311C245.195 542.73 249.777 540.134 257.031 540.134C264.896 540.134 272.762 543.417 276.732 545.402L282.536 534.254ZM648.229 527.687C640.364 527.687 635.095 531.657 631.811 536.85V528.985H618.066V591.906H631.811V556.475C631.811 546.013 636.393 540.057 644.945 540.057C647.542 540.057 650.825 540.744 653.498 541.355L657.469 528.374C654.796 527.687 650.902 527.687 648.229 527.687ZM472.599 560.522C472.599 579.536 485.733 593.281 506.045 593.281C515.208 593.281 521.775 591.295 528.342 586.103L521.775 574.954C516.506 578.925 511.314 580.834 505.357 580.834C494.209 580.834 486.344 572.969 486.344 560.522C486.344 548.686 494.209 540.821 505.357 540.21C511.237 540.21 516.506 542.195 521.775 546.09L528.342 534.941C521.775 529.672 515.208 527.763 506.045 527.763C485.733 527.687 472.599 541.508 472.599 560.522ZM599.74 560.522V529.061H585.995V536.926C581.413 531.047 574.846 527.763 566.294 527.763C548.578 527.763 534.833 541.508 534.833 560.522C534.833 579.536 548.578 593.281 566.294 593.281C575.457 593.281 582.024 589.997 585.995 584.118V591.983H599.74V560.522ZM549.265 560.522C549.265 549.373 556.443 540.21 568.279 540.21C579.428 540.21 587.293 548.762 587.293 560.522C587.293 571.671 579.428 580.834 568.279 580.834C556.519 580.147 549.265 571.594 549.265 560.522ZM384.783 527.687C366.457 527.687 353.322 540.821 353.322 560.446C353.322 580.147 366.457 593.205 385.47 593.205C394.634 593.205 403.797 590.608 411.051 584.652L404.484 574.801C399.216 578.772 392.648 581.369 386.158 581.369C377.605 581.369 369.129 577.398 367.144 566.325H413.648C413.648 564.34 413.648 563.042 413.648 561.056C414.259 540.821 402.423 527.687 384.783 527.687ZM384.783 539.523C393.336 539.523 399.215 544.792 400.514 554.566H367.755C369.053 546.09 374.933 539.523 384.783 539.523ZM726.27 560.522V504.167H712.525V536.926C707.943 531.047 701.376 527.763 692.824 527.763C675.108 527.763 661.363 541.508 661.363 560.522C661.363 579.536 675.108 593.281 692.824 593.281C701.987 593.281 708.554 589.997 712.525 584.118V591.983H726.27V560.522ZM675.795 560.522C675.795 549.373 682.973 540.21 694.809 540.21C705.958 540.21 713.823 548.762 713.823 560.522C713.823 571.671 705.958 580.834 694.809 580.834C682.973 580.147 675.795 571.594 675.795 560.522ZM215.643 560.522V529.061H201.898V536.926C197.317 531.047 190.75 527.763 182.197 527.763C164.482 527.763 150.737 541.508 150.737 560.522C150.737 579.536 164.482 593.281 182.197 593.281C191.361 593.281 197.928 589.997 201.898 584.118V591.983H215.643V560.522ZM164.558 560.522C164.558 549.373 171.736 540.21 183.572 540.21C194.721 540.21 202.586 548.762 202.586 560.522C202.586 571.671 194.721 580.834 183.572 580.834C171.736 580.147 164.558 571.594 164.558 560.522Z"
        // fill="black"
        fill={variant === "color" ? "black" : "white"}
      />
      <path
        d="M484.434 51.1938H277.954V422.156H484.434V51.1938Z"
        // fill="#FF5A00"
        fill={variant === "white" ? "white" : "#FF5A00"}
      />
      <path
        d="M291.699 236.675C291.699 161.307 327.131 94.4143 381.5 51.1939C341.487 19.7331 291.012 0.719238 235.956 0.719238C105.531 0.719238 0 106.25 0 236.675C0 367.1 105.531 472.631 235.956 472.631C291.012 472.631 341.487 453.617 381.5 422.156C327.054 379.547 291.699 312.043 291.699 236.675Z"
        // fill="#EB001B"
        fill={variant === "white" ? "white" : "#EB001B"}
      />
      <path
        d="M763 236.675C763 367.1 657.469 472.631 527.044 472.631C471.988 472.631 421.513 453.617 381.5 422.156C436.556 378.859 471.301 312.043 471.301 236.675C471.301 161.307 435.869 94.4143 381.5 51.1939C421.437 19.7331 471.911 0.719238 526.968 0.719238C657.469 0.719238 763 106.937 763 236.675Z"
        // fill="#F79E1B"
        fill={variant === "white" ? "white" : "#F79E1B"}
      />
    </Box>
  );
}
