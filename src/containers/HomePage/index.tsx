import { FC, useEffect, useMemo, useState } from 'react'
import Container, { Crumb } from 'components/Container'
import { BackTop, Card, Col, notification, Row, Spin } from 'antd'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useInjectSaga } from 'utils/injectSaga'
import saga from './saga'
import reducer from './reducer'
import { useInjectReducer } from 'utils/injectReducer'
import useDispatch from './useDispatch'
import { useSelector } from './useSelector'
import { UpButton } from './styled'
import { parse, ParsedQuery } from 'query-string'

const HomePage: FC = () => {
  useInjectReducer({ key: 'homePage', reducer })
  useInjectSaga({ key: 'homePage', saga })
  const { load, reset } = useDispatch()
  const { data, error, loading, page, s } = useSelector()
  const { search } = useLocation()
  const history = useHistory()
  const [defaultSearch, setDefaultSearch] = useState<string>('superman')
  const [value, setValue] = useState<string>('superman')

  const crumbs: ReadonlyArray<Crumb> = useMemo(() => {
    return [{ to: '/', label: 'Home' }, { label: 'List' }]
  }, [])

  useEffect(
    () => (data.length === 0 ? load({ page: 1, s: defaultSearch }) : undefined),
    [data.length, defaultSearch, load]
  )

  useEffect(() => {
    if (error) {
      notification.error({ message: error.Error, onClose: reset })
    }
  }, [error, reset])

  useEffect(() => {
    window.onscroll = () => {
      const pos =
        (document.documentElement.scrollTop || document.body.scrollTop) +
        document.documentElement.offsetHeight
      const max = document.documentElement.scrollHeight
      if (pos === max) {
        load({ s, page: page + 1 })
      }
    }
  }, [load, page, s])

  useEffect(() => {
    if (defaultSearch !== s) {
      load({ page: 1, s: defaultSearch, new: true })
    }
  }, [load, defaultSearch, s])

  useEffect(() => {
    const qs: ParsedQuery = parse(search)
    if (qs.search) {
      setDefaultSearch(qs.search as string)
      setValue(qs.search as string)
    }
  }, [search])

  return (
    <>
      <Container
        crumbs={crumbs}
        valueSearch={value}
        onSearch={(v) => history.push(`/?search=${v}`)}
        onChange={(e) => setValue(e.target.value)}
      >
        <BackTop>
          <UpButton>UP</UpButton>
        </BackTop>
        <Spin spinning={loading}>
          <Row gutter={[24, 24]} justify="center">
            {data.map(({ Poster, Title, Year, imdbID }, index) => (
              <Col sm={24} md={8} lg={6} key={index}>
                <Link to={`/${imdbID}`}>
                  <Card
                    hoverable
                    cover={<img alt={`${Title}-img`} src={Poster} />}
                  >
                    <Card.Meta title={Title} description={Year} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Spin>
      </Container>
    </>
  )
}

export default HomePage
