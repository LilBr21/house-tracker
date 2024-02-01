"use client";

import styled from "styled-components";
import { customTheme } from "../theme";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${customTheme.colors.backgroundPrimary};
  color: ${customTheme.colors.textPrimary};
`;
