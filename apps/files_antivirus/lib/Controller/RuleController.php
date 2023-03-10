<?php
/**
 * ownCloud - Files_antivirus
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Viktar Dubiniuk <dubiniuk@owncloud.com>
 *
 * @copyright Viktar Dubiniuk 2015-2018
 * @license AGPL-3.0
 */

namespace OCA\Files_Antivirus\Controller;

use \OCP\AppFramework\Controller;
use \OCP\IRequest;
use \OCP\IL10N;
use OCP\AppFramework\Http\JSONResponse;
use OCP\ILogger;
use \OCA\Files_Antivirus\Db\Rule;
use \OCA\Files_Antivirus\Db\RuleMapper;

class RuleController extends Controller {
	private $logger;
	private $l10n;
	private $ruleMapper;

	/**
	 * RuleController constructor.
	 *
	 * @param string $appName
	 * @param IRequest $request
	 * @param ILogger $logger
	 * @param IL10N $l10n
	 * @param RuleMapper $ruleMapper
	 */
	public function __construct(
		$appName,
		IRequest $request,
		ILogger $logger,
		IL10N $l10n,
		RuleMapper $ruleMapper
	) {
		parent::__construct($appName, $request);
		$this->logger = $logger;
		$this->l10n = $l10n;
		$this->ruleMapper = $ruleMapper;
	}
	
	/**
	 * Returns all rules
	 *
	 * @return JSONResponse
	 */
	public function listAll() {
		$statuses = $this->ruleMapper->findAll();
		return new JSONResponse(['statuses' => $statuses]);
	}
	
	/**
	 * Removes all rules
	 *
	 * @return JSONResponse
	 */
	public function clear() {
		$this->ruleMapper->deleteAll();
		return new JSONResponse();
	}
	
	/**
	 * Resets a table to initial state
	 *
	 * @return JSONResponse
	 */
	public function reset() {
		$this->ruleMapper->deleteAll();
		$this->ruleMapper->populate();
		return new JSONResponse();
	}
	
	/**
	 * Adds/Updates a rule
	 *
	 * @param int $id
	 * @param int $statusType
	 * @param string $match
	 * @param string $description
	 * @param int $status
	 *
	 * @return JSONResponse
	 */
	public function save($id, $statusType, $match, $description, $status) {
		if ($id) {
			$rule = $this->ruleMapper->find($id);
		} else {
			$rule = new Rule();
		}
		
		$rule->setStatusType($statusType);
		$rule->setDescription($description);
		$rule->setStatus($status);
		
		if ($statusType === Rule::RULE_TYPE_CODE) {
			$rule->setResult($match);
		} else {
			$rule->setMatch($match);
		}
			
		if ($id) {
			$newRule = $this->ruleMapper->update($rule);
		} else {
			$newRule = $this->ruleMapper->insert($rule);
		}
		
		return new JSONResponse($newRule);
	}
	
	/**
	 * Deletes a rule
	 *
	 * @param int $id
	 *
	 * @return JSONResponse
	 */
	public function delete($id) {
		try {
			$rule = $this->ruleMapper->find($id);
			$this->ruleMapper->delete($rule);
		} catch (\Exception $e) {
			//TODO: Handle
		}
		return new JSONResponse($rule);
	}
}
