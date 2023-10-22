import { Box } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

interface LogoProps extends BoxProps {
  size?: number;
}

export function ParticleLogoText({ size = 50, ...others }: LogoProps) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * (68 / 486)}
      viewBox="0 0 486 68"
      xmlSpace="preserve"
      {...others}
    >
      <circle cx="432.104" cy="12.5795" r="4.38079" fill="white" />
      <circle cx="439.66" cy="7.19378" r="4.38079" fill="white" />
      <circle cx="448.502" cy="4.38079" r="4.38079" fill="white" />
      <circle cx="457.585" cy="4.54143" r="4.38079" fill="white" />
      <circle cx="473.662" cy="13.2226" r="4.38079" fill="white" />
      <circle cx="466.347" cy="7.59563" r="4.38079" fill="white" />
      <circle cx="479.047" cy="20.7783" r="4.38079" fill="white" />
      <circle cx="481.619" cy="29.62" r="4.38079" fill="white" />
      <circle cx="481.619" cy="38.9448" r="4.38079" fill="white" />
      <circle cx="478.565" cy="47.7065" r="4.38079" fill="white" />
      <circle cx="472.938" cy="55.1816" r="4.38079" fill="white" />
      <circle cx="465.463" cy="60.5673" r="4.38079" fill="white" />
      <circle cx="456.701" cy="63.3002" r="4.38079" fill="white" />
      <circle cx="447.457" cy="63.1396" r="4.38079" fill="white" />
      <circle cx="438.695" cy="60.0048" r="4.38079" fill="white" />
      <circle cx="431.381" cy="54.4584" r="4.38079" fill="white" />
      <circle cx="439.538" cy="20.3267" r="2.62012" fill="white" />
      <circle cx="444.137" cy="16.9448" r="2.62012" fill="white" />
      <circle cx="449.667" cy="15.1016" r="2.62012" fill="white" />
      <circle cx="455.421" cy="15.0371" r="2.62012" fill="white" />
      <circle cx="465.599" cy="20.229" r="2.62012" fill="white" />
      <circle cx="460.982" cy="16.8638" r="2.62012" fill="white" />
      <circle cx="469.061" cy="24.9893" r="2.62012" fill="white" />
      <circle cx="470.921" cy="30.519" r="2.62012" fill="white" />
      <circle cx="470.921" cy="36.3369" r="2.62012" fill="white" />
      <circle cx="469.094" cy="41.979" r="2.62012" fill="white" />
      <circle cx="465.729" cy="46.6914" r="2.62012" fill="white" />
      <circle cx="461.017" cy="50.1533" r="2.62012" fill="white" />
      <circle cx="455.615" cy="52.0293" r="2.62012" fill="white" />
      <circle cx="449.765" cy="51.9331" r="2.62012" fill="white" />
      <circle cx="444.204" cy="50.2188" r="2.62012" fill="white" />
      <circle cx="439.587" cy="46.7407" r="2.62012" fill="white" />
      <circle cx="444.285" cy="26.1245" r="1.44918" fill="white" />
      <circle cx="446.829" cy="24.2539" r="1.44918" fill="white" />
      <circle cx="449.887" cy="23.2343" r="1.44918" fill="white" />
      <circle cx="453.069" cy="23.1987" r="1.44918" fill="white" />
      <circle cx="458.699" cy="26.0703" r="1.44918" fill="white" />
      <circle cx="456.145" cy="24.2089" r="1.44918" fill="white" />
      <circle cx="460.614" cy="28.7036" r="1.44918" fill="white" />
      <circle cx="461.643" cy="31.7617" r="1.44918" fill="white" />
      <circle cx="461.643" cy="34.9795" r="1.44918" fill="white" />
      <circle cx="460.632" cy="38.1001" r="1.44918" fill="white" />
      <circle cx="458.77" cy="40.7065" r="1.44918" fill="white" />
      <circle cx="456.165" cy="42.6215" r="1.44918" fill="white" />
      <circle cx="453.177" cy="43.6586" r="1.44918" fill="white" />
      <circle cx="449.941" cy="43.6059" r="1.44918" fill="white" />
      <circle cx="446.865" cy="42.6577" r="1.44918" fill="white" />
      <circle cx="444.312" cy="40.7338" r="1.44918" fill="white" />
      <path
        d="M386.926 46.9713V21.3501H393.533V32.184H393.893L402.93 21.3501H410.711L401.021 32.7845L410.885 46.9713H402.983L396.176 36.9004L393.533 40.028V46.9713H386.926Z"
        fill="white"
      />
      <path
        d="M360.348 46.9713V21.3501H371.64C373.686 21.3501 375.453 21.6962 376.939 22.3885C378.434 23.0724 379.586 24.0565 380.396 25.3409C381.206 26.6169 381.61 28.1307 381.61 29.8821C381.61 31.6586 381.197 33.1682 380.369 34.4109C379.542 35.6452 378.367 36.5877 376.845 37.2382C375.324 37.8804 373.522 38.2015 371.44 38.2015H364.299V33.3225H370.212C371.208 33.3225 372.04 33.2016 372.708 32.9597C373.384 32.7095 373.896 32.3342 374.243 31.8338C374.59 31.325 374.763 30.6745 374.763 29.8821C374.763 29.0898 374.59 28.4351 374.243 27.918C373.896 27.3926 373.384 27.0006 372.708 26.7421C372.031 26.4752 371.199 26.3417 370.212 26.3417H366.955V46.9713H360.348ZM375.738 35.2616L382.545 46.9713H375.337L368.663 35.2616H375.738Z"
        fill="white"
      />
      <path
        d="M354.799 34.1609C354.799 36.9799 354.22 39.3693 353.064 41.3293C351.907 43.2893 350.341 44.778 348.365 45.7955C346.399 46.813 344.192 47.3217 341.745 47.3217C339.289 47.3217 337.078 46.8088 335.111 45.783C333.144 44.7571 331.583 43.2684 330.426 41.3168C329.278 39.3568 328.704 36.9715 328.704 34.1609C328.704 31.3419 329.278 28.9524 330.426 26.9925C331.583 25.0325 333.144 23.5438 335.111 22.5263C337.078 21.5088 339.289 21 341.745 21C344.192 21 346.399 21.5088 348.365 22.5263C350.341 23.5438 351.907 25.0325 353.064 26.9925C354.22 28.9524 354.799 31.3419 354.799 34.1609ZM348.045 34.1609C348.045 32.4928 347.791 31.0833 347.284 29.9324C346.786 28.7814 346.065 27.9099 345.122 27.3177C344.187 26.7256 343.062 26.4295 341.745 26.4295C340.437 26.4295 339.311 26.7256 338.368 27.3177C337.425 27.9099 336.699 28.7814 336.192 29.9324C335.694 31.0833 335.445 32.4928 335.445 34.1609C335.445 35.8289 335.694 37.2384 336.192 38.3894C336.699 39.5403 337.425 40.4119 338.368 41.004C339.311 41.5962 340.437 41.8923 341.745 41.8923C343.062 41.8923 344.187 41.5962 345.122 41.004C346.065 40.4119 346.786 39.5403 347.284 38.3894C347.791 37.2384 348.045 35.8289 348.045 34.1609Z"
        fill="white"
      />
      <path
        d="M295.465 46.9713L287.51 21.3501H294.811L298.936 38.139H299.163L303.874 21.3501H309.828L314.539 38.1765H314.766L318.904 21.3501H326.192L318.25 46.9713H311.883L306.958 31.4334H306.744L301.819 46.9713H295.465Z"
        fill="white"
      />
      <path
        d="M260.889 26.3793V21.3501H283.993V26.3793H275.705V46.9713H269.191V26.3793H260.889Z"
        fill="white"
      />
      <path
        d="M236.894 46.9713V21.3501H255.954V26.3793H243.501V31.6336H254.98V36.6753H243.501V41.9421H255.954V46.9713H236.894Z"
        fill="white"
      />
      <path
        d="M231.048 21.3501V46.9713H225.442L214.563 32.184H214.39V46.9713H207.783V21.3501H213.469L224.227 36.1123H224.454V21.3501H231.048Z"
        fill="white"
      />
      <path
        d="M173.126 46.9713V21.3501H192.187V26.3793H179.734V31.6336H191.213V36.6753H179.734V41.9421H192.187V46.9713H173.126Z"
        fill="white"
      />
      <path
        d="M150.035 46.9713V21.3501H156.642V41.9421H168.014V46.9713H150.035Z"
        fill="white"
      />
      <path
        d="M144.563 30.633H137.889C137.8 29.9908 137.618 29.4111 137.342 28.894C137.066 28.3769 136.701 27.9349 136.247 27.5679C135.794 27.201 135.255 26.9216 134.632 26.7297C134.018 26.5296 133.338 26.4295 132.59 26.4295C131.264 26.4295 130.121 26.7339 129.16 27.3427C128.208 27.9516 127.474 28.8315 126.957 29.9824C126.45 31.1334 126.197 32.5262 126.197 34.1609C126.197 35.8623 126.455 37.2885 126.971 38.4394C127.496 39.582 128.23 40.4452 129.173 41.029C130.125 41.6045 131.251 41.8923 132.55 41.8923C133.28 41.8923 133.943 41.8047 134.539 41.6295C135.144 41.4544 135.673 41.2 136.127 40.8664C136.59 40.5245 136.968 40.1116 137.262 39.6279C137.564 39.1358 137.773 38.5812 137.889 37.964L144.563 38.0015C144.447 39.1358 144.096 40.2534 143.509 41.3543C142.93 42.4552 142.134 43.4602 141.119 44.3693C140.105 45.2701 138.868 45.9873 137.409 46.5211C135.958 47.0549 134.294 47.3217 132.417 47.3217C129.943 47.3217 127.727 46.813 125.769 45.7955C123.821 44.7696 122.281 43.2767 121.151 41.3168C120.021 39.3568 119.456 36.9715 119.456 34.1609C119.456 31.3419 120.03 28.9524 121.178 26.9925C122.326 25.0325 123.879 23.5438 125.836 22.5263C127.794 21.5088 129.987 21 132.417 21C134.072 21 135.602 21.2168 137.008 21.6505C138.414 22.0759 139.651 22.7014 140.719 23.5271C141.787 24.3444 142.654 25.3494 143.322 26.5421C143.989 27.7347 144.403 29.0984 144.563 30.633Z"
        fill="white"
      />
      <path d="M113.91 21.3501V46.9713H107.303V21.3501H113.91Z" fill="white" />
      <path
        d="M79.2808 26.3793V21.3501H102.386V26.3793H94.0967V46.9713H87.583V26.3793H79.2808Z"
        fill="white"
      />
      <path
        d="M53.5967 46.9713V21.3501H64.8888C66.9354 21.3501 68.7018 21.6962 70.1878 22.3885C71.6827 23.0724 72.8351 24.0565 73.6448 25.3409C74.4546 26.6169 74.8595 28.1307 74.8595 29.8821C74.8595 31.6586 74.4457 33.1682 73.6182 34.4109C72.7906 35.6452 71.616 36.5877 70.0944 37.2382C68.5727 37.8804 66.7708 38.2015 64.6886 38.2015H57.5476V33.3225H63.4606C64.4572 33.3225 65.2892 33.2016 65.9566 32.9597C66.6329 32.7095 67.1445 32.3342 67.4916 31.8338C67.8386 31.325 68.0121 30.6745 68.0121 29.8821C68.0121 29.0898 67.8386 28.4351 67.4916 27.918C67.1445 27.3926 66.6329 27.0006 65.9566 26.7421C65.2803 26.4752 64.4483 26.3417 63.4606 26.3417H60.2038V46.9713H53.5967ZM68.9865 35.2616L75.7938 46.9713H68.5861L61.9123 35.2616H68.9865Z"
        fill="white"
      />
      <path
        d="M28.8207 46.9713H21.7197L30.943 21.3501H39.7391L48.9623 46.9713H41.8613L35.4411 27.8054H35.2275L28.8207 46.9713ZM27.873 36.8879H42.7156V41.5918H27.873V36.8879Z"
        fill="white"
      />
      <path
        d="M0 46.9713V21.3501H11.2921C13.3387 21.3501 15.1051 21.7254 16.5911 22.476C18.0861 23.2183 19.2384 24.2567 20.0482 25.5911C20.8579 26.9172 21.2628 28.4601 21.2628 30.2199C21.2628 31.9881 20.849 33.5352 20.0215 34.8613C19.2028 36.179 18.0327 37.2007 16.511 37.9263C14.9894 38.6519 13.183 39.0147 11.0919 39.0147H4.12442V34.1357H9.86391C10.8605 34.1357 11.6925 33.973 12.3599 33.6478C13.0362 33.3225 13.5479 32.8679 13.8949 32.2841C14.2419 31.692 14.4155 31.0039 14.4155 30.2199C14.4155 29.4276 14.2419 28.7437 13.8949 28.1682C13.5479 27.5844 13.0362 27.134 12.3599 26.8171C11.6836 26.5002 10.8516 26.3417 9.86391 26.3417H6.60708V46.9713H0Z"
        fill="white"
      />
    </Box>
  );
}
