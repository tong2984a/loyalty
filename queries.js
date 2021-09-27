const {pool} = require('./config')

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY alias ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.header('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = request.params.id

  pool.query('SELECT * FROM users WHERE alias = $1', [id.trim()], (error, results) => {
    if (error) {
      throw error
    }
    response.header('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { alias, address, balance } = request.body
  pool.query('INSERT INTO users (alias, address, balance) VALUES ($1, $2, $3) returning ID', [alias.trim(), (address ? address.trim() : ''), balance], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).json(result.rows[0].id)
  })
}

const updateUser = (request, response) => {
  const id = request.params.id
  const { address, balance } = request.body

  pool.query(
    'UPDATE users SET address = $1, balance = $2 WHERE alias = $3',
    [address.trim(), balance, id.trim()],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const earnReward = (request, response) => {
  const id = request.params.id
  const { amount, currencyCode } = request.body

  pool.query(
    'UPDATE users SET balance = balance + $1 WHERE alias = $2',
    [amount, id.trim()],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const redeemReward = (request, response) => {
  const id = request.params.id
  const { amount, currencyCode } = request.body

  pool.query(
    'UPDATE users SET balance = balance - $1 WHERE alias = $2',
    [amount, id.trim()],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = request.params.id

  pool.query('DELETE FROM users WHERE alias = $1', [id.trim()], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const createConsumerSurvey = (request, response) => {
  const { results } = request.body
  pool.query('INSERT INTO consumer_surveys (results) VALUES ($1) returning ID', [results.trim()], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).json(result.rows[0].id)
  })
}

const createSupplierSurvey = (request, response) => {
  const { results } = request.body
  pool.query('INSERT INTO supplier_surveys (results) VALUES ($1) returning ID', [results.trim()], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).json(result.rows[0].id)
  })
}

const getSupplierSurveyById = (request, response) => {
  var id = request.query.id;

  pool.query('SELECT * FROM supplier_surveys WHERE ID = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    var image = JSON.parse(results.rows[0].results)['Upload Dish Photo'][0].content;
    response.status(200).send(image);
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  earnReward,
  redeemReward,
  createConsumerSurvey,
  createSupplierSurvey,
  getSupplierSurveyById
}
