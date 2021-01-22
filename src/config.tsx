
import * as fcl from "@onflow/fcl"

fcl.config()
  .put("accessNode.api", process.env.REACT_APP_FLOW_NODE)
  .put("challenge.handshake", process.env.REACT_APP_FLOW_AUTH_URL)
  .put("env", process.env.ENV)
