import test from 'node:test';
import assert from 'node:assert/strict';
import {
  saveCase,
  getCaseById,
  deleteCase,
  saveCourtroomTrial,
  getCourtroomTrialByCaseId,
  createShareLink,
  getSharedVerdict,
  revokeShareLink
} from './db.js';
import { runPythonForensics } from './pythonBridge.js';
import { InvestigationResponseSchema, CourtroomResponseSchema } from './geminiService.js';

test('Database Case Lifecycle and Persistence', async (t) => {
  const caseId = `case_test_${Date.now()}`;

  await t.test('saveCase inserts a valid case with an access token', () => {
    const originalMessage = 'we need to talk tomorrow morning';
    const context = 'from project manager after sprint review';
    const saved = saveCase({
      id: caseId,
      title: 'Sprint Review Aftermath',
      message: originalMessage,
      context,
      status: 'analysing'
    });
    
    assert.ok(saved);
    assert.equal(saved.id, caseId);
    assert.ok(saved.accessToken.length > 20);
    assert.equal(saved.message, originalMessage);
    assert.equal(saved.context, context);
    assert.equal(saved.status, 'analysing');

    const retrieved = getCaseById(caseId);
    assert.equal(retrieved.id, caseId);
    assert.equal(retrieved.status, 'analysing');
  });

  await t.test('saveCase updates status and analysis payload', () => {
    const updated = saveCase({
      id: caseId,
      title: 'Monosyllabic Cold War',
      status: 'ready',
      summary: 'Extreme passive aggressive brevity detected',
      interpretations: {
        optimistic: { title: 'Quick Ack', text: 'Just confirming receipt.', plausibility: 'High' },
        neutral: { title: 'Standard Response', text: 'Typing on the move.', plausibility: 'High' },
        pessimistic: { title: 'Passive Coldness', text: 'Exhausted or frustrated.', plausibility: 'Moderate' },
        unexpected: { title: 'Pocket Dial', text: 'Sent by mistake.', plausibility: 'Low' },
        evidenceBased: { title: 'Contextual Brevity', text: 'Historical pattern of brief replies.', plausibility: 'High' }
      }
    });

    assert.equal(updated.status, 'ready');
    const retrieved = getCaseById(caseId);
    assert.equal(retrieved.status, 'ready');
    assert.equal(retrieved.title, 'Monosyllabic Cold War');
    assert.ok(retrieved.interpretations.optimistic);
  });

  await t.test('saveCourtroomTrial stores verdict and updates lifecycle to verdict_reached', () => {
    const trialId = `trial_${caseId}`;
    const mockVerdict = {
      id: trialId,
      caseId: caseId,
      prosecution: { arguments: ['Defendant was negligent'] },
      defence: { arguments: ['Defendant was genuinely overwhelmed'] },
      verdict: {
        title: 'Acquitted of Malice',
        summary: 'Defendant had 4 conflicting meetings',
        confidence: '85%'
      },
      meme: {
        title: 'Clown Makeup',
        archetype: 'Clown Putting On Makeup',
        caption: 'Thinking a thumbs up meant everything was great'
      }
    };

    saveCourtroomTrial(mockVerdict);
    const retrievedTrial = getCourtroomTrialByCaseId(caseId);
    assert.ok(retrievedTrial);
    assert.equal(retrievedTrial.caseId, caseId);
    assert.equal(retrievedTrial.verdict.title, 'Acquitted of Malice');

    const updatedCase = getCaseById(caseId);
    assert.equal(updatedCase.status, 'verdict_reached');
  });

  await t.test('Share Token lifecycle and revocation', () => {
    const shareToken = createShareLink(caseId, false);
    assert.ok(shareToken);

    const sharedVerdict = getSharedVerdict(shareToken);
    assert.ok(sharedVerdict);
    assert.equal(sharedVerdict.shareToken, shareToken);
    assert.equal(sharedVerdict.originalMessage, '[Redacted for Privacy]');

    const revoked = revokeShareLink(shareToken);
    assert.equal(revoked, true);

    const afterRevoke = getSharedVerdict(shareToken);
    assert.equal(afterRevoke, null);
  });

  await t.test('deleteCase cleans up records', () => {
    const deleted = deleteCase(caseId);
    assert.equal(deleted, true);

    const retrieved = getCaseById(caseId);
    assert.equal(retrieved, null);
  });
});

test('Python Subsystem Bridge & Linguistic Forensic Metrics', async (t) => {
  await t.test('runPythonForensics calculates severity index and cognitive distortions', async () => {
    const metrics = await runPythonForensics('they hate me and will fire me tomorrow', 'workplace review');
    assert.ok(metrics);
    assert.equal(typeof metrics.overthinkingIndex, 'number');
    assert.ok(metrics.overthinkingIndex >= 0 && metrics.overthinkingIndex <= 100);
    assert.ok(Array.isArray(metrics.distortions));
    assert.ok(metrics.distortions.length > 0);
    assert.ok(metrics.recommendedMeme);
  });
});

test('Zod Schemas Resilience and Structure', (t) => {
  const sampleInvestigation = {
    title: 'The Unfinished Ellipsis',
    interpretations: {
      optimistic: { title: 'Thought in Flight', text: 'Typing more later', plausibility: 'Medium' },
      neutral: { title: 'Trailing Pause', text: 'Casual informal pause', plausibility: 'High' },
      pessimistic: { title: 'Ominous Silence', text: 'Holding back irritation', plausibility: 'Low' },
      unexpected: { title: 'Accidental Touch', text: 'Slipped on keyboard', plausibility: 'Low' },
      evidenceBased: { title: 'Habitual Typist', text: 'Uses ellipses like commas', plausibility: 'High' }
    },
    knownFacts: ['3 dots sent', 'No further text followed'],
    assumptions: ['The sender is unhappy'],
    unknowns: ['What sender was doing at the time'],
    evidenceTakeaway: 'Ellipses are informal trailing markers with high ambiguity.',
    realityCheck: {
      headline: 'Put the Phone Down',
      suggestion: 'Do not text again asking if everything is okay.',
      proportionateAction: 'Wait 3 hours.'
    }
  };

  const parsed = InvestigationResponseSchema.safeParse(sampleInvestigation);
  assert.ok(parsed.success, `Schema validation failed: ${JSON.stringify(parsed.error)}`);

  const sampleCourtroom = {
    prosecution: {
      arguments: ['The punctuation mark was used deliberately to sow anxiety.']
    },
    defence: {
      arguments: ['Client was walking through a subway turnstile and dropped their thumb.']
    },
    verdict: {
      title: 'Acquitted by Reason of Commuter Rush',
      summary: 'No premeditated malice could be established beyond reasonable doubt.'
    },
    nextStep: {
      headline: 'Resume Standard Activities',
      suggestion: 'Step away from draft messages.',
      proportionateAction: 'Carry on with daily life.'
    }
  };

  const parsedCourtroom = CourtroomResponseSchema.safeParse(sampleCourtroom);
  assert.ok(parsedCourtroom.success, `Courtroom validation failed: ${JSON.stringify(parsedCourtroom.error)}`);
});
