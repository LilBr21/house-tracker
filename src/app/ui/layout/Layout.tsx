"use client";

import styled from "styled-components";
import { theme } from "../theme";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${theme.colors.backgroundPrimary};
  color: ${theme.colors.textPrimary};
`;
