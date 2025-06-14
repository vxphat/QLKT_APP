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
import { data_DTDT, data_dungTuoi, data_KTCB } from "../DTDT/DTDTdata";

const DTDT = () => {
  // Hàm chuyển đổi chuỗi số có dấu phẩy thành số thực
  const parseNumber = (str) => {
    if (str === "-" || !str) return 0;
    return parseFloat(str.replace(".", "").replace(",", "."));
  };

  // Tính tổng cho từng cột
  const totals = {
    sxkd_01012025: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.sxkd_01012025),
      0
    ),
    mocao_2025: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.mocao_2025),
      0
    ),
    sxkd_thanhlytc: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.sxkd_thanhlytc),
      0
    ),
    sxkd_thanhlygdp: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.sxkd_thanhlygdp),
      0
    ),
    sxkd_31122025: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.sxkd_31122025),
      0
    ),
    ktcb_01012025: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.ktcb_01012025),
      0
    ),
    ktcb_mocao_2025: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.ktcb_mocao_2025),
      0
    ),
    ktcb_thanhlygdp: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.ktcb_thanhlygdp),
      0
    ),
    ktcb_31122025: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.ktcb_31122025),
      0
    ),
    kh_tctm_2025: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.kh_tctm_2025),
      0
    ),
    luancanh_2021: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.luancanh_2021),
      0
    ),
    luancanh_2022: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.luancanh_2022),
      0
    ),
    luancanh_2023: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.luancanh_2023),
      0
    ),
    tong_luancanh: data_DTDT.reduce(
      (sum, row) =>
        sum +
        parseNumber(row.luancanh_2023) +
        parseNumber(row.luancanh_2022) +
        parseNumber(row.luancanh_2021),
      0
    ),
    fsc: data_DTDT.reduce((sum, row) => sum + parseNumber(row.fsc), 0),
    vg_vn: data_DTDT.reduce((sum, row) => sum + parseNumber(row.vg_vn), 0),
    cho_gdp: data_DTDT.reduce((sum, row) => sum + parseNumber(row.cho_gdp), 0),
    dt_chuyentc: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.dt_chuyentc),
      0
    ),
    thanhly_goivu: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.thanhly_goivu),
      0
    ),
    tong_dt_vuon: data_DTDT.reduce(
      (sum, row) => sum + parseNumber(row.tong_dt_vuon),
      0
    ),
  };

  // Hàm định dạng số về chuỗi với dấu phẩy
  const formatNumber = (num) => {
    if (num === 0) return "-";
    return num
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Fragment>
      <Pageheader title="Năm 2025" heading="Tables" active="Tables" />
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>DIỄN TIẾN DIỆN TÍCH VƯỜN CÂY CAO SU</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap col-stt bg-light"
                        rowSpan={3}>
                        STT
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-nongtruong bg-light"
                        rowSpan={3}>
                        Nông trường
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-nongtruong bg-secondary"
                        colSpan={5}>
                        SẢN XUẤT KINH DOANH
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-nongtruong bg-success"
                        colSpan={4}>
                        KIẾN THIẾT CƠ BẢN
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-kh-tctm-2025 bg-light"
                        rowSpan={3}>
                        KH TCTM 2025
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-nongtruong bg-warning"
                        colSpan={12}>
                        LUÂN CANH
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-fsc bg-light"
                        rowSpan={3}>
                        FSC
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-vg-vn bg-light"
                        rowSpan={3}>
                        VG, VN
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-cho-gdp bg-light"
                        rowSpan={3}>
                        Chờ GĐP
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-dt-chuyentc bg-light"
                        rowSpan={3}>
                        DT chuyển TC
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-thanhly-goivu bg-light"
                        rowSpan={3}>
                        Thanh lý gối vụ
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-dt-vuon bg-danger"
                        rowSpan={3}>
                        Tổng DT vườn cây
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap col-sxkd-01012025 bg-secondary"
                        rowSpan={2}>
                        01.01.2025
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-mocao-2025 bg-secondary"
                        rowSpan={2}>
                        Mở cạo 2025
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-sxkd-thanhlytc bg-secondary"
                        rowSpan={2}>
                        Thanh lý TC
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-sxkd-thanhlygdp bg-secondary"
                        rowSpan={2}>
                        Thanh lý GĐP
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-sxkd-31122025 bg-secondary"
                        rowSpan={2}>
                        31.12.2025
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-ktcb-01012025 bg-success"
                        rowSpan={2}>
                        01.01.2025
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-ktcb-mocao-2025 bg-success"
                        rowSpan={2}>
                        Mở cạo 2025
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-ktcb-thanhlygdp bg-success"
                        rowSpan={2}>
                        Thanh lý GĐP
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-ktcb-31122025 bg-success"
                        rowSpan={2}>
                        31.12.2025
                      </th>

                      <th
                        scope="col"
                        className="text-wrap col-luancanh-2021 bg-warning"
                        colSpan={3}>
                        2021
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-luancanh-2022 bg-warning"
                        colSpan={3}>
                        2022
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-luancanh-2023 bg-warning"
                        colSpan={3}>
                        2023
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning"
                        colSpan={3}>
                        Cộng
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Cao su
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Keo lai
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Cộng
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Cao su
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Keo lai
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Cộng
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Cao su
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Keo lai
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Cộng
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Cao su
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Keo lai
                      </th>
                      <th
                        scope="col"
                        className="text-wrap col-tong-luancanh bg-warning">
                        Tổng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data_DTDT.map((row) => (
                      <tr key={row.stt}>
                        <th scope="row" className="text-center">
                          {row.stt}
                        </th>
                        <td className="text-center">{row.nongtruong}</td>
                        <td className="text-end fw-bold">
                          {row.sxkd_01012025}
                        </td>
                        <td className="text-end">{row.mocao_2025}</td>
                        <td className="text-end">{row.sxkd_thanhlytc}</td>
                        <td className="text-end">{row.sxkd_thanhlygdp}</td>
                        <td className="text-end fw-bold">
                          {row.sxkd_31122025}
                        </td>
                        <td className="text-end fw-bold">
                          {row.ktcb_01012025}
                        </td>
                        <td className="text-end">{row.ktcb_mocao_2025}</td>
                        <td className="text-end">{row.ktcb_thanhlygdp}</td>
                        <td className="text-end fw-bold">
                          {row.ktcb_31122025}
                        </td>
                        <td className="text-end">{row.kh_tctm_2025}</td>
                        <td className="text-end">{row.luancanh_2021}</td>
                        <td className="text-end">{row.luancanh_2022}</td>
                        <td className="text-end">{row.luancanh_2023}</td>
                        <td className="text-end fw-bold">
                          {row.tong_luancanh}
                        </td>
                        <td className="text-end">{row.fsc}</td>
                        <td className="text-end">{row.vg_vn}</td>
                        <td className="text-end">{row.cho_gdp}</td>
                        <td className="text-end">{row.dt_chuyentc}</td>
                        <td className="text-end">{row.thanhly_goivu}</td>
                        <td className="text-end fw-bold">{row.tong_dt_vuon}</td>
                      </tr>
                    ))}
                    <tr className="table-active fw-bold">
                      <th
                        scope="row"
                        colSpan={2}
                        className="text-center fw-bold">
                        Cộng
                      </th>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlytc)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_31122025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_31122025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.kh_tctm_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.luancanh_2021)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.luancanh_2022)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.luancanh_2023)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.tong_luancanh)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.fsc)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.vg_vn)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.cho_gdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.dt_chuyentc)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.thanhly_goivu)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.tong_dt_vuon)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>
                DIỆN TÍCH VƯỜN CÂY KTCB - TCTM - LUÂN CANH NĂM 2025
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap bg-light col-stt"
                        rowSpan={2}>
                        STT
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-light col-nongtruong"
                        rowSpan={2}>
                        Nông trường
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-dtktcb"
                        colSpan={9}>
                        Diện tích KTCB (ha)
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-success col-ktcbtrongdo"
                        colSpan={3}>
                        KTCB, Trong đó:
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-light col-kh-tctm-2025"
                        rowSpan={2}>
                        KH TCTM 2025
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-warning col-luancanh"
                        colSpan={4}>
                        Luân canh
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2017">
                        2017
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2018">
                        2018
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2019">
                        2019
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2020">
                        2020
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2021">
                        2021
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2022">
                        2022
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2023">
                        2023
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2024">
                        2024
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-cong">
                        CỘNG
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-success col-dungtuoi">
                        Đúng tuổi
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-success col-hoanmocao">
                        Hoãn mở cạo
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-success col-keodai">
                        Kéo dài
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-warning col-luancanh-2021">
                        2021
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-warning col-luancanh-2022">
                        2022
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-warning col-luancanh-2023">
                        2023
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-warning col-tong-luancanh">
                        Tổng luân canh
                      </th>
                    </tr>
                    <tr></tr>

                    <tr></tr>
                  </thead>
                  <tbody>
                    {data_KTCB.map((row) => (
                      <tr key={row.stt}>
                        <th scope="row" className="text-center">
                          {row.stt}
                        </th>
                        <td className="text-center">{row.nongtruong}</td>
                        <td className="text-end">{row.sxkd_01012025}</td>
                        <td className="text-end">{row.mocao_2025}</td>
                        <td className="text-end">{row.sxkd_thanhlytc}</td>
                        <td className="text-end">{row.sxkd_thanhlygdp}</td>
                        <td className="text-end">{row.sxkd_31122025}</td>
                        <td className="text-end">{row.ktcb_01012025}</td>
                        <td className="text-end">{row.ktcb_mocao_2025}</td>
                        <td className="text-end">{row.ktcb_thanhlygdp}</td>
                        <td className="text-end">{row.ktcb_31122025}</td>
                        <td className="text-end">{row.kh_tctm_2025}</td>
                        <td className="text-end">{row.luancanh_2021}</td>
                        <td className="text-end">{row.luancanh_2022}</td>
                        <td className="text-end">{row.luancanh_2023}</td>
                        <td className="text-end">{row.tong_luancanh}</td>
                        <td className="text-end">{row.fsc}</td>
                        <td className="text-end">{row.vg_vn}</td>
                        <td className="text-end">{row.cho_gdp}</td>
                      </tr>
                    ))}
                    <tr className="table-active fw-bold">
                      <th
                        scope="row"
                        colSpan={2}
                        className="text-center fw-bold">
                        Cộng
                      </th>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlytc)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_31122025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_31122025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.kh_tctm_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.luancanh_2021)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.luancanh_2022)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.luancanh_2023)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.tong_luancanh)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.fsc)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.vg_vn)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.cho_gdp)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>
                DIỆN TÍCH VƯỜN CÂY KTCB CHĂM SÓC ĐÚNG TUỔI (Đến 31.12.2025)
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap bg-light col-stt"
                        rowSpan={2}>
                        STT
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-light col-nongtruong"
                        rowSpan={2}>
                        Nông trường
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-dtktcb"
                        colSpan={9}>
                        Diện tích (ha)
                      </th>

                      <th
                        scope="col"
                        className="text-wrap bg-light col-kh-tctm-2025"
                        rowSpan={2}>
                        Ghi chú
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2017">
                        2017
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2018">
                        2018
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2019">
                        2019
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2020">
                        2020
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2021">
                        2021
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2022">
                        2022
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2023">
                        2023
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2024">
                        2024
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-cong">
                        CỘNG
                      </th>
                    </tr>
                    <tr></tr>

                    <tr></tr>
                  </thead>
                  <tbody>
                    {data_dungTuoi.map((row) => (
                      <tr key={row.stt}>
                        <th scope="row" className="text-center">
                          {row.stt}
                        </th>
                        <td className="text-center">{row.nongtruong}</td>
                        <td className="text-end">{row.sxkd_01012025}</td>
                        <td className="text-end">{row.mocao_2025}</td>
                        <td className="text-end">{row.sxkd_thanhlytc}</td>
                        <td className="text-end">{row.sxkd_thanhlygdp}</td>
                        <td className="text-end">{row.sxkd_31122025}</td>
                        <td className="text-end">{row.ktcb_01012025}</td>
                        <td className="text-end">{row.ktcb_mocao_2025}</td>
                        <td className="text-end">{row.ktcb_thanhlygdp}</td>
                        <td className="text-end">{row.ktcb_31122025}</td>
                      </tr>
                    ))}
                    <tr className="table-active fw-bold">
                      <th
                        scope="row"
                        colSpan={2}
                        className="text-center fw-bold">
                        Cộng
                      </th>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlytc)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_31122025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_31122025)}
                      </td>
                      <td className="text-end fw-bold"></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>
                DIỆN TÍCH VƯỜN CÂY KTCB HOÃN MỞ CẠO DO YẾU TỐ GIỐNG (Đến
                31.12.2025)
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap bg-light col-stt"
                        rowSpan={2}>
                        STT
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-light col-nongtruong"
                        rowSpan={2}>
                        Nông trường
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-dtktcb"
                        colSpan={9}>
                        Diện tích (ha)
                      </th>

                      <th
                        scope="col"
                        className="text-wrap bg-light col-kh-tctm-2025"
                        rowSpan={2}>
                        Ghi chú
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2017">
                        2017
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2018">
                        2018
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2019">
                        2019
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2020">
                        2020
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2021">
                        2021
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2022">
                        2022
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2023">
                        2023
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2024">
                        2024
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-cong">
                        CỘNG
                      </th>
                    </tr>
                    <tr></tr>

                    <tr></tr>
                  </thead>
                  <tbody>
                    {data_dungTuoi.map((row) => (
                      <tr key={row.stt}>
                        <th scope="row" className="text-center">
                          {row.stt}
                        </th>
                        <td className="text-center">{row.nongtruong}</td>
                        <td className="text-end">{row.sxkd_01012025}</td>
                        <td className="text-end">{row.mocao_2025}</td>
                        <td className="text-end">{row.sxkd_thanhlytc}</td>
                        <td className="text-end">{row.sxkd_thanhlygdp}</td>
                        <td className="text-end">{row.sxkd_31122025}</td>
                        <td className="text-end">{row.ktcb_01012025}</td>
                        <td className="text-end">{row.ktcb_mocao_2025}</td>
                        <td className="text-end">{row.ktcb_thanhlygdp}</td>
                        <td className="text-end">{row.ktcb_31122025}</td>
                      </tr>
                    ))}
                    <tr className="table-active fw-bold">
                      <th
                        scope="row"
                        colSpan={2}
                        className="text-center fw-bold">
                        Cộng
                      </th>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlytc)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_31122025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_31122025)}
                      </td>
                      <td className="text-end fw-bold"></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>
                DIỆN TÍCH VƯỜN CÂY KTCB KÉO DÀI DO YẾU TỐ SINH TRƯỞNG (Đến
                31.12.2025)
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap bg-light col-stt"
                        rowSpan={2}>
                        STT
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-light col-nongtruong"
                        rowSpan={2}>
                        Nông trường
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-dtktcb"
                        colSpan={9}>
                        Diện tích (ha)
                      </th>

                      <th
                        scope="col"
                        className="text-wrap bg-light col-kh-tctm-2025"
                        rowSpan={2}>
                        Ghi chú
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2017">
                        2017
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2018">
                        2018
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2019">
                        2019
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2020">
                        2020
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2021">
                        2021
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2022">
                        2022
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2023">
                        2023
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2024">
                        2024
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-cong">
                        CỘNG
                      </th>
                    </tr>
                    <tr></tr>

                    <tr></tr>
                  </thead>
                  <tbody>
                    {data_dungTuoi.map((row) => (
                      <tr key={row.stt}>
                        <th scope="row" className="text-center">
                          {row.stt}
                        </th>
                        <td className="text-center">{row.nongtruong}</td>
                        <td className="text-end">{row.sxkd_01012025}</td>
                        <td className="text-end">{row.mocao_2025}</td>
                        <td className="text-end">{row.sxkd_thanhlytc}</td>
                        <td className="text-end">{row.sxkd_thanhlygdp}</td>
                        <td className="text-end">{row.sxkd_31122025}</td>
                        <td className="text-end">{row.ktcb_01012025}</td>
                        <td className="text-end">{row.ktcb_mocao_2025}</td>
                        <td className="text-end">{row.ktcb_thanhlygdp}</td>
                        <td className="text-end">{row.ktcb_31122025}</td>
                      </tr>
                    ))}
                    <tr className="table-active fw-bold">
                      <th
                        scope="row"
                        colSpan={2}
                        className="text-center fw-bold">
                        Cộng
                      </th>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlytc)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_31122025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_31122025)}
                      </td>
                      <td className="text-end fw-bold"></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>
                DIỆN TÍCH VƯỜN CÂY KTCB KÉO DÀI (Đến 31.12.2025)
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap bg-light col-stt"
                        rowSpan={2}>
                        STT
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-light col-nongtruong"
                        rowSpan={2}>
                        Nông trường
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-dtktcb"
                        colSpan={9}>
                        Diện tích (ha)
                      </th>

                      <th
                        scope="col"
                        className="text-wrap bg-light col-kh-tctm-2025"
                        rowSpan={2}>
                        Ghi chú
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2017">
                        2017
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2018">
                        2018
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2019">
                        2019
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2020">
                        2020
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2021">
                        2021
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2022">
                        2022
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2023">
                        2023
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-nt-2024">
                        2024
                      </th>
                      <th
                        scope="col"
                        className="text-wrap bg-secondary col-cong">
                        CỘNG
                      </th>
                    </tr>
                    <tr></tr>

                    <tr></tr>
                  </thead>
                  <tbody>
                    {data_dungTuoi.map((row) => (
                      <tr key={row.stt}>
                        <th scope="row" className="text-center">
                          {row.stt}
                        </th>
                        <td className="text-center">{row.nongtruong}</td>
                        <td className="text-end">{row.sxkd_01012025}</td>
                        <td className="text-end">{row.mocao_2025}</td>
                        <td className="text-end">{row.sxkd_thanhlytc}</td>
                        <td className="text-end">{row.sxkd_thanhlygdp}</td>
                        <td className="text-end">{row.sxkd_31122025}</td>
                        <td className="text-end">{row.ktcb_01012025}</td>
                        <td className="text-end">{row.ktcb_mocao_2025}</td>
                        <td className="text-end">{row.ktcb_thanhlygdp}</td>
                        <td className="text-end">{row.ktcb_31122025}</td>
                      </tr>
                    ))}
                    <tr className="table-active fw-bold">
                      <th
                        scope="row"
                        colSpan={2}
                        className="text-center fw-bold">
                        Cộng
                      </th>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlytc)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.sxkd_31122025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_01012025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_mocao_2025)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_thanhlygdp)}
                      </td>
                      <td className="text-end fw-bold">
                        {formatNumber(totals.ktcb_31122025)}
                      </td>
                      <td className="text-end fw-bold"></td>
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

export default DTDT;
