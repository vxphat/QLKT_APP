import { FC, Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";
import Pageheader from "../../../../../components/pageheader/pageheader";
// import { danhMucCN } from "../danhSachCN/danhSachCNdata";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxFOlMtnfIJBHmQalX1szMymurvXoO1u-3kvgBH4kS1zdZc1UdDfWBe-0R_a5uTjXNy/exec"; // URL web app của bạn
const TOKEN = "vxphat1994@";

const DanhSachLo = () => {
  const [danhSachCN, setDanhSachCN] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  async function loadDanhSachCN(query = "") {
    setLoading(true);
    try {
      const url = new URL(API_URL);
      url.searchParams.set("token", TOKEN);
      if (query) url.searchParams.set("q", query);
      console.log("Fetching:", url.toString());
      const res = await fetch(url.toString(), { method: "GET" });
      const json = await res.json();
      setDanhSachCN(json.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDanhSachCN();
  }, []);

  return (
    <Fragment>
      <Pageheader title="Danh sách lô" heading="Tables" active="Tables" />
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>Thông tin chi tiết</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col xl={3} lg={6} md={6} sm={12}>
                  {/* <Form.Label htmlFor="input-search">Type Search</Form.Label> */}
                  <Form.Control
                    type="search"
                    id="input-search"
                    placeholder="Tìm tên công nhân"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </Col>
                <Col xl={3} lg={6} md={6} sm={12}>
                  <Button
                    className="btn btn-primary label-btn"
                    onClick={() => loadDanhSachCN(keyword)}
                    disabled={loading}>
                    <i className="bi bi-search label-btn-icon me-2"></i>
                    {loading ? "Đang tải..." : "Tìm kiếm"}
                  </Button>
                </Col>
                <Col xl={3} lg={6} md={6} sm={12}></Col>
                <Col xl={3} lg={6} md={6} sm={12} className="d-flex">
                  <Button className="btn btn-secondary label-btn ms-auto">
                    <i className="bi bi-plus-lg label-btn-icon me-2"></i>
                    Thêm CN
                  </Button>
                </Col>
              </Row>

              <div className="table-responsive">
                <Table className="table text-nowrap" id="bangNhap">
                  <thead className="sticky-header">
                    <tr>
                      <th className="text-wrap ">Năm DSCN</th>
                      <th className="text-wrap ">HT thu</th>
                      <th className="text-center">Đội</th>
                      <th className="text-center ">Tổ</th>
                      <th className="text-wrap ">STT CN</th>
                      <th className="text-wrap ">STT phần cây</th>
                      <th className="text-wrap ">Mã CN</th>
                      <th className="text-wrap ">Tên CN</th>
                      <th className="text-wrap ">Mã lô</th>
                      <th className="text-wrap ">Tên lô</th>
                      <th className="text-wrap ">Nhịp độ cạo</th>
                      <th className="text-wrap ">Phiên cạo</th>
                      <th className="text-wrap ">Số cây cạo</th>
                      <th className="text-wrap ">HT phần cây</th>
                    </tr>
                  </thead>
                  <tbody>
                    {danhSachCN.map((cn, idx) => (
                      <tr key={idx}>
                        <td>{cn.namDSCN}</td>
                        <td>{cn.htThu}</td>
                        <td>{cn.doi}</td>
                        <td>{cn.to}</td>
                        <td>{cn.sttCN}</td>
                        <td>{cn.sttPC}</td>
                        <td>{cn.maCN}</td>
                        <td>{cn.tenCN}</td>
                        <td>{cn.maLo}</td>
                        <td>{cn.tenLo}</td>
                        <td>{cn.nhipDoCao}</td>
                        <td>{cn.phienCao}</td>
                        <td>{cn.soCayCao}</td>
                        <td>{cn.htPhanCay}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
          max-height: 660px;
          overflow-y: auto;
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 10; /* Đảm bảo tiêu đề nằm trên nội dung bảng */
          background-color: inherit; /* Giữ màu nền của tiêu đề */
        }

        .table th.text-wrap,
        .table td {
          white-space: normal !important;
          padding: 8px;
          vertical-align: middle;
          text-align: center;
        }
        .table th.col-HTPC {
          width: 100px;
        }
        .table th.col-tenCN {
          width: 200px;
        }
        .table th.col-maCN {
          width: 120px;
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

export default DanhSachLo;
