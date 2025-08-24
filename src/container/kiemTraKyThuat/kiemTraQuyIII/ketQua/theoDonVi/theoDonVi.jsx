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
import { donVidata } from "../../danhMuc/dinhMuc/dinhMucData";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxgIjtPLhCcv8nNWavOsMcTCObTUaQdMT_AvBVjHtB5e1FwEKCShO5EL3IWKW_ydBWo/exec";
const TOKEN = "vxphat1994@";

const YEARS = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const KQtheoDonVi = () => {
  const [dataLo, setDataLo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [nam, setNam] = useState("");
  const [maDonVi, setMaDonVi] = useState("");

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

  useEffect(() => {
    loadKQKT();
  }, []);

  return (
    <Fragment>
      {/* <Pageheader
        title="Kết Quả Theo Đơn Vị"
        heading="Tables"
        active="Tables"
      /> */}
      <Row className="mt-3">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>
                CHI TIẾT XÉT THƯỞNG VƯỜN CÂY MỞ CẠO
                {nam && <> NĂM {nam}</>}
                {maDonVi && (
                  <>
                    {" "}
                    -{" ĐỘI "}
                    {donVidata
                      .find((dv) => dv.maDonVi === maDonVi)
                      ?.donVi.toLocaleUpperCase()}
                  </>
                )}
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

              <div className="table-responsive">
                <Table className="table text-nowrap" id="bangNhap">
                  <thead className="sticky-header">
                    <tr>
                      <th className="text-wrap" rowSpan={2}>
                        STT
                      </th>
                      <th className="text-wrap" rowSpan={2}>
                        Đội
                      </th>
                      <th className="text-center" rowSpan={2}>
                        Tên lô
                      </th>
                      <th className="text-center" rowSpan={2}>
                        Năm trồng
                      </th>
                      <th className="text-wrap " rowSpan={2}>
                        Hạng đất
                      </th>
                      <th className="text-wrap " rowSpan={2}>
                        Giống
                      </th>
                      <th className="text-wrap " rowSpan={2}>
                        Diện tích KK
                      </th>
                      <th className="text-wrap " rowSpan={2}>
                        Diện tích MC
                      </th>
                      <th className="text-wrap " rowSpan={2}>
                        Tổng số hố KT
                      </th>
                      <th className="text-wrap " rowSpan={2}>
                        Hố trống
                      </th>
                      <th className="text-wrap " colSpan={3}>
                        Cây chưa cạo
                      </th>
                      <th className="text-wrap " colSpan={3}>
                        Cây cạo
                      </th>
                      <th className="text-wrap " colSpan={2}>
                        Kết quả
                      </th>
                      <th className="text-wrap " rowSpan={2}>
                        Tỷ lệ vi phạm (%)
                      </th>
                      <th className="text-wrap " rowSpan={2}>
                        DT xét thưởng
                      </th>
                    </tr>
                    <tr>
                      <th>&ge; 50</th>
                      <th>&lt; 50</th>
                      <th>Tổng</th>
                      <th>&ge; 50</th>
                      <th>&lt; 50</th>
                      <th>Tổng</th>
                      <th className="text-wrap ">Tỷ lệ cây đạt vanh (%)</th>
                      <th>Điểm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataLo.map((cn, idx) => (
                      <tr key={idx}>
                        <td>{cn.stt}</td>
                        <td>{cn.doi}</td>
                        <td>{cn.tenLo}</td>
                        <td>{cn.namTrong}</td>
                        <td>{cn.hangDat}</td>
                        <td>{cn.giong}</td>
                        <td>{cn.dienTichKK}</td>
                        <td>{cn.dienTichMC}</td>
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

export default KQtheoDonVi;
