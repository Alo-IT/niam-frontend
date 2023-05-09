<Card
  bordered={false}
  className="criclebox tablespace mb-24"
  title="Authors Table"
  extra={
    <>
      <Radio.Group onChange={onChange} defaultValue="a">
        <Radio.Button value="a">All</Radio.Button>
        <Radio.Button value="b">ONLINE</Radio.Button>
      </Radio.Group>
    </>
  }
>
  <div className="table-responsive">
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      className="ant-border-space"
    />
  </div>
</Card>;
