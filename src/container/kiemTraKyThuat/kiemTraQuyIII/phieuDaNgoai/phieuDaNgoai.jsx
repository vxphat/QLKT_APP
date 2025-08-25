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
import Pageheader from "../../../../components/pageheader/pageheader";
import { donVidata } from "../../kiemTraQuyIII/danhMuc/dinhMuc/dinhMucData";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwZM002-mVfsGaQeGlEt9qLnTK4Ef41VWhDFHlAeuH6XF_Xo9Lsiv194etMJCpzNbhiwA/exec"; // URL web app của bạn
const TOKEN = "vxphat1994@";

const YEARS = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const PhieuDaNgoai = () => {
  const [danhSachCN, setDanhSachCN] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [nam, setNam] = useState("");
  const [maDonVi, setMaDonVi] = useState("");
  const [tenLo, setTenLo] = useState("");

  async function loadKQKT(query = "") {
    setLoading(true);
    try {
      const url = new URL(API_URL);
      url.searchParams.set("token", TOKEN);
      if (query) url.searchParams.set("q", query);
      console.log("Fetching:", url.toString());
      const res = await fetch(url.toString(), { method: "GET" });
      const json = await res.json();
      loadKQKT(json.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   loadKQKT();
  // }, []);

  return (
    <Fragment>
      {/* <Pageheader title="Phiếu Dã Ngoại" heading="Tables" active="Tables" /> */}
      <Row className="mt-3">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>
                PHIẾU KIỂM TRA DÃ NGOẠI VƯỜN CÂY MỞ CẠO NĂM 2024
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn năm"
                    value={nam}
                    onChange={(e) => setNam(e.target.value)}>
                    <option value="">Chọn năm</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn đơn vị"
                    value={maDonVi}
                    onChange={(e) => setMaDonVi(e.target.value)}>
                    <option value="">Chọn đơn vị</option>
                    {donVidata.map((dv) => (
                      <option key={dv.id} value={dv.maDonVi}>
                        {dv.maDonVi} - {dv.donVi}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn lô"
                    value={maDonVi}
                    onChange={(e) => setMaDonVi(e.target.value)}>
                    <option value="">Chọn lô</option>
                    {donVidata.map((dv) => (
                      <option key={dv.id} value={dv.maDonVi}>
                        {dv.maDonVi} - {dv.donVi}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12}>
                  <Button
                    className="btn btn-primary label-btn"
                    onClick={() => loadKQKT(keyword)}
                    disabled={loading}>
                    <i className="bi bi-search label-btn-icon me-2"></i>
                    {loading ? "Đang tải..." : "Tìm kiếm"}
                  </Button>
                </Col>
              </Row>

              <Row className="mt-5">
                <Col xl={3}>
                  <p>
                    <b>TỔNG CÔNG TY CAO SU ĐỒNG NAI</b>
                  </p>
                  <p>
                    {" "}
                    <b>Đội:</b>
                  </p>
                  <p>
                    {" "}
                    <b>Ngày kiểm tra:</b>{" "}
                  </p>
                </Col>
              </Row>

              <div className="d-flex justify-content-center">
                <h4>PHIẾU KIỂM TRA DÃ NGOẠI VƯỜN CÂY MỞ CẠO NĂM 2024</h4>
              </div>

              <div className="table-responsive mt-4">
                <Table className="table text-nowrap" id="bangNhap">
                  <thead className="sticky-header ">
                    <tr className="border">
                      <th className="text-wrap border" rowSpan={5}>
                        STT
                      </th>
                      <th className="text-center border" colSpan={8}>
                        Lô:........Năm trồng:.........
                      </th>
                    </tr>

                    <tr>
                      <th className="text-center border" colSpan={8}>
                        Tọa độ cây thứ I: Hàng:.....Cây:....
                      </th>
                    </tr>
                    <tr>
                      <th className="text-center border" rowSpan={3}>
                        HT
                      </th>
                      <td className="text-center border" colSpan={4}>
                        Vanh
                      </td>
                      <td className="text-center border" colSpan={3}>
                        Nấm hồng
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center border" colSpan={2}>
                        Cây cạo
                      </td>
                      <td className="text-center border" colSpan={2}>
                        Cây chưa cạo
                      </td>
                      <td className="text-center border" rowSpan={2}>
                        C, C1
                      </td>
                      <td className="text-center border" rowSpan={2}>
                        C2+
                      </td>
                      <td className="text-center border" rowSpan={2}>
                        Cụt đọt
                      </td>
                    </tr>
                    <tr>
                      <td className="border col-narrow dotted-right">
                        Trên 50
                      </td>
                      <td>Dưới 50</td>
                      <td>Trên 50</td>
                      <td>Dưới 50</td>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 20 }, (_, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2">
                        <b>Cộng</b>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
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

export default PhieuDaNgoai;
