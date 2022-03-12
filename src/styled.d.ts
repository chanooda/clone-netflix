import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mainColor: string;
    fontColor: string;
    headerColor: string;
    bgColor: string;
  }
}
