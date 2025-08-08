import { FC, Fragment, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Collapse,
  Form,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";
import Pageheader from "../../../components/pageheader/pageheader";
import { Link } from "react-router-dom";
// import { data_DTDT, data_dungTuoi, data_KTCB } from "../DTDT/DTDTdata";

const NhapMuTuoi = () => {
  //collapse1
  const [open1, setOpen1] = useState(false);

  return (
    <Fragment>
      <Pageheader
        title="Nhập mủ tươi công nhân"
        heading="Tables"
        active="Tables"
      />
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>Khai báo thông tin</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row gy-4">
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-date">Ngày nhập mủ</Form.Label>
                  <Form.Control type="date" id="input-date" />
                </Col>

                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-label">
                    Form Input With Label
                  </Form.Label>
                  <Form.Control type="text" id="input-label" />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-placeholder">
                    Form Input With Placeholder
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="input-placeholder"
                    placeholder="Placeholder"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-text">Type Text</Form.Label>
                  <Form.Control
                    type="text"
                    id="input-text"
                    placeholder="Text"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-number">Type Number</Form.Label>
                  <Form.Control
                    type="number"
                    id="input-number"
                    placeholder="Number"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-password">
                    Type Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    id="input-password"
                    placeholder="Password"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-email">Type Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="input-email"
                    placeholder="Email@xyz.com"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-tel">Type Tel</Form.Label>
                  <Form.Control
                    type="tel"
                    id="input-tel"
                    placeholder="+1100-2031-1233"
                  />
                </Col>

                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-week">Type Week</Form.Label>
                  <Form.Control
                    type="week"
                    className="form-control"
                    id="input-week"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-month">Type Month</Form.Label>
                  <Form.Control type="month" id="input-month" />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-time">Type Time</Form.Label>
                  <Form.Control type="time" id="input-time" />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-datetime-local">
                    Type datetime-local
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="input-datetime-local"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-search">Type Search</Form.Label>
                  <Form.Control
                    type="search"
                    id="input-search"
                    placeholder="Search"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-submit">Type Submit</Form.Label>
                  <Form.Control
                    type="submit"
                    id="input-submit"
                    defaultValue="Submit"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-reset">Type Reset</Form.Label>
                  <Form.Control type="reset" id="input-reset" />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-button">Type Button</Form.Label>
                  <Form.Control
                    type="button"
                    className="form-control btn btn-primary"
                    id="input-button"
                    defaultValue="Button"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Row>
                    <Col xl={3}>
                      <Form.Label>Type Color</Form.Label>
                      <Form.Control
                        className="form-control form-input-color"
                        type="color"
                        defaultValue="#136bd0"
                      />
                    </Col>
                    <Col xl={5}>
                      <div className="ps-0">
                        <p className="mb-3 px-0 text-muted">Type Checkbox</p>
                        <Form.Check
                          className="ms-2"
                          type="checkbox"
                          defaultValue=""
                          defaultChecked
                        />
                      </div>
                    </Col>
                    <Col xl={4}>
                      <div className="ps-0">
                        <p className="mb-3 px-0 text-muted">Type Radio</p>
                        <Form.Check
                          className="ms-2"
                          type="radio"
                          defaultChecked
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-file">Type File</Form.Label>
                  <Form.Control type="file" id="input-file" />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label>Type Url</Form.Label>
                  <Form.Control
                    type="url"
                    name="website"
                    placeholder="http://example.com"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-disabled">
                    Type Disabled
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="input-disabled"
                    placeholder="Disabled input"
                    disabled
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-readonlytext">
                    Input Readonly Text
                  </Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="input-readonlytext"
                    defaultValue="email@example.com"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="disabled-readonlytext">
                    Disabled Readonly Input
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue="Disabled readonly input"
                    id="disabled-readonlytext"
                    aria-label="Disabled input example"
                    disabled
                    readOnly
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label>Type Readonly Input</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue="Readonly input here..."
                    aria-label="readonly input example"
                    readOnly
                  />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="text-area">Textarea</Form.Label>
                  <Form.Control as="textarea" id="text-area" rows={1} />
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Form.Label htmlFor="input-DataList">
                    Datalist example
                  </Form.Label>
                  <Form.Control
                    list="datalistOptions"
                    id="input-DataList"
                    placeholder="Type to search..."
                  />
                  <datalist id="datalistOptions">
                    <option defaultValue="San Francisco"></option>
                    <option defaultValue="New York"></option>
                    <option defaultValue="Seattle"></option>
                    <option defaultValue="Los Angeles"></option>
                    <option defaultValue="Chicago"></option>
                  </datalist>
                </Col>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CSS tùy chỉnh */}
      <style jsx>{`
        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .table th.text-wrap,
        .table td {
          white-space: normal !important;
          padding: 8px;
          vertical-align: middle;
          text-align: center;
        }
        .table th.col-stt {
          width: 50px;
        }
        .table th.col-nongtruong {
          width: 80px;
        }
        .table th.col-sxkd-01012025,
        .table th.col-mocao-2025,
        .table th.col-sxkd-thanhlytc,
        .table th.col-sxkd-thanhlygdp,
        .table th.col-sxkd-31122025,
        .table th.col-ktcb-01012025,
        .table th.col-ktcb-mocao-2025,
        .table th.col-ktcb-thanhlygdp,
        .table th.col-ktcb-31122025,
        .table th.col-kh-tctm-2025,
        .table th.col-luancanh-2021,
        .table th.col-luancanh-2022,
        .table th.col-luancanh-2023,
        .table th.col-tong-luancanh,
        .table th.col-fsc,
        .table th.col-vg-vn,
        .table th.col-cho-gdp,
        .table th.col-dt-chuyentc,
        .table th.col-thanhly-goivu,
        .table th.col-tong-dt-vuon {
          width: 120px;
        }
        .table tr.table-active {
          font-weight: bold;
          background-color: #f1f1f1;
        }
        /* Tùy chỉnh thanh trượt ngang */
        .table-responsive::-webkit-scrollbar {
          height: 12px; /* Tăng chiều rộng thanh trượt ngang */
        }
        .table-responsive::-webkit-scrollbar-track {
          background: #f1f1f1; /* Màu nền của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb {
          background: #888; /* Màu của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #555; /* Màu khi hover */
        }
      `}</style>
    </Fragment>
  );
};

export default NhapMuTuoi;
