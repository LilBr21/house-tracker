"use client";

import styled from "styled-components";
import { customTheme } from "../theme";

export enum HeadingSize {
  Large = "large",
  Medium = "medium",
  Small = "small",
}

export const Heading = styled.h1<{ $size?: HeadingSize }>`
  color: ${customTheme.colors.textPrimary};
  font-size: ${({ $size }) =>
    $size === HeadingSize.Large
      ? customTheme.fontSizes.large
      : $size === HeadingSize.Medium
      ? customTheme.fontSizes.medium
      : customTheme.fontSizes.small};
  font-weight: ${customTheme.fontWeights.bold};
  width: fit-content;
`;
