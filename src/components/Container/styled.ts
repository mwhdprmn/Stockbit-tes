import { Layout, Typography } from 'antd'
import styled from 'styled-components'

export const StyledLayoutHeader = styled(Layout.Header)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content !important;
  padding: 10px 10px !important;

  @media only screen and (min-width: 992px) {
    flex-direction: row;
    padding: 10px 50px !important;
  }
`

export const StyledTitle = styled(Typography.Title)`
  font-size: 20px !important;
  color: #fff !important;
  width: 200px;
  text-align: center;

  @media only screen and (min-width: 992px) {
    margin-bottom: 0 !important;
    text-align: left;
  }
`

export const StyledLayoutContent = styled(Layout.Content)`
  min-height: 100vh;
  padding: 10px 10px !important;

  @media only screen and (min-width: 992px) {
    flex-direction: row;
    padding: 10px 50px !important;
  }
`
