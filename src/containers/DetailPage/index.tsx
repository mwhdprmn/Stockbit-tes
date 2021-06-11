import { Col, Descriptions, Modal, notification, Row, Spin } from 'antd'
import Container, { Crumb } from 'components/Container'
import { FC, useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { DetailContainer } from './styled'
import { useInjectSaga } from 'utils/injectSaga'
import saga from './saga'
import reducer from './reducer'
import { useInjectReducer } from 'utils/injectReducer'
import useDispatch from './useDispatch'
import { useSelector } from './useSelector'

interface Params {
  readonly id: string
}

const DetailPage: FC = () => {
  useInjectReducer({ key: 'detailPage', reducer })
  useInjectSaga({ key: 'detailPage', saga })
  const { load, reset } = useDispatch()
  const { data, error, loading } = useSelector()
  const { id }: Params = useParams()
  const [modal, setModal] = useState<boolean>(false)
  const history = useHistory()

  const crumbs: ReadonlyArray<Crumb> = useMemo(() => {
    return [
      { to: '/', label: 'Home' },
      { to: '/', label: 'List' },
      { label: data?.Title || id },
    ]
  }, [data?.Title, id])

  useEffect(() => load(id), [load, id])

  useEffect(() => {
    if (error) {
      notification.error({ message: error.Error, onClose: reset })
    }
  }, [error, reset])

  return (
    <Container crumbs={crumbs} onSearch={(v) => history.push(`/?search=${v}`)}>
      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          <Col sm={24} md={5}>
            <img
              style={{ cursor: 'pointer' }}
              onClick={() => setModal(true)}
              width="100%"
              src={data?.Poster}
              alt={`${data?.Title || 'movie'}-img`}
            />
          </Col>
          <Col sm={24} md={19}>
            <DetailContainer>
              <Descriptions
                column={{ xs: 1, sm: 1, md: 1, lg: 2 }}
                title="Movie Detail"
                bordered
                layout="horizontal"
              >
                <Descriptions.Item label="Title">
                  {data?.Title}
                </Descriptions.Item>
                <Descriptions.Item label="Year">{data?.Year}</Descriptions.Item>
                <Descriptions.Item label="Rate">
                  {data?.Rated}
                </Descriptions.Item>
                <Descriptions.Item label="Released">
                  {data?.Released}
                </Descriptions.Item>
                <Descriptions.Item label="Genre">
                  {data?.Genre}
                </Descriptions.Item>
                <Descriptions.Item label="Runtime">
                  {data?.Runtime}
                </Descriptions.Item>
                <Descriptions.Item label="Director">
                  {data?.Director}
                </Descriptions.Item>
                <Descriptions.Item label="Writer">
                  {data?.Writer}
                </Descriptions.Item>
                <Descriptions.Item label="Actors">
                  {data?.Actors}
                </Descriptions.Item>
                <Descriptions.Item label="Plot">{data?.Plot}</Descriptions.Item>
                <Descriptions.Item label="Language">
                  {data?.Language}
                </Descriptions.Item>
                <Descriptions.Item label="Country">
                  {data?.Country}
                </Descriptions.Item>
                <Descriptions.Item label="BoxOffice">
                  {data?.BoxOffice}
                </Descriptions.Item>
                <Descriptions.Item label="Production">
                  {data?.Production}
                </Descriptions.Item>
                <Descriptions.Item label="IMDB Votes">
                  {data?.imdbVotes}
                </Descriptions.Item>
                <Descriptions.Item label="IMDB Rating">
                  {data?.imdbRating}
                </Descriptions.Item>
              </Descriptions>
            </DetailContainer>
          </Col>
        </Row>
        <Modal
          visible={modal}
          onCancel={() => setModal(false)}
          onOk={() => setModal(false)}
          footer={false}
          closable={false}
          title={false}
        >
          <img
            width="100%"
            src={data?.Poster}
            alt={`${data?.Title || 'movie'}-img`}
          />
        </Modal>
      </Spin>
    </Container>
  )
}

export default DetailPage
