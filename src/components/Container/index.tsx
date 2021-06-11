import { Breadcrumb, Input, Layout } from 'antd'
import { ChangeEvent, FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { StyledLayoutContent, StyledLayoutHeader, StyledTitle } from './styled'

export interface Crumb {
  readonly to?: string
  readonly label: string
}

export interface Props {
  readonly children: ReactNode
  readonly crumbs: ReadonlyArray<Crumb>
  readonly onSearch?: (value: string) => void
  readonly valueSearch?: string
  readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Container: FC<Props> = ({
  children,
  crumbs,
  onSearch,
  valueSearch,
  onChange,
}: Props) => {
  return (
    <Layout>
      <StyledLayoutHeader>
        <StyledTitle>StockBit-Film</StyledTitle>
        <Input.Search
          value={valueSearch}
          onSearch={onSearch}
          autoComplete="search"
          onChange={onChange}
          placeholder="Search film by name"
        />
      </StyledLayoutHeader>
      <StyledLayoutContent>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {crumbs.map(({ to, label }, index) => (
            <Breadcrumb.Item key={index}>
              {to ? <Link to={to}>{label}</Link> : label}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        {children}
      </StyledLayoutContent>
    </Layout>
  )
}

export default Container
